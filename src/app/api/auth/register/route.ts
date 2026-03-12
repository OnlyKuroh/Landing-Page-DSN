import { NextResponse } from "next/server";
import {
  generateRegistrationOptions,
  verifyRegistrationResponse,
  type VerifiedRegistrationResponse,
} from "@simplewebauthn/server";
import { supabase } from "@/lib/supabase";

const RP_NAME = "Athila Cabrall Admin";
const RP_ID = process.env.NEXT_PUBLIC_WEBAUTHN_RP_ID || "localhost";
const ORIGIN = process.env.NEXT_PUBLIC_WEBAUTHN_ORIGIN || "http://localhost:3000";

// Generate registration options
export async function GET() {
  try {
    // Check if any credential already exists (only 1 admin)
    const { data: existing } = await supabase
      .from("credentials")
      .select("id")
      .limit(1);

    if (existing && existing.length > 0) {
      return NextResponse.json(
        { error: "Já existe uma credencial registrada." },
        { status: 400 }
      );
    }

    const options = await generateRegistrationOptions({
      rpName: RP_NAME,
      rpID: RP_ID,
      userName: "athila-admin",
      userDisplayName: "Athila Cabrall",
      attestationType: "none",
      authenticatorSelection: {
        residentKey: "preferred",
        userVerification: "required",
      },
    });

    // Store challenge temporarily
    await supabase.from("challenges").upsert({
      id: "registration",
      challenge: options.challenge,
      created_at: new Date().toISOString(),
    });

    return NextResponse.json(options);
  } catch (error) {
    console.error("Registration options error:", error);
    return NextResponse.json(
      { error: "Erro ao gerar opções de registro" },
      { status: 500 }
    );
  }
}

// Verify registration response
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Get stored challenge
    const { data: challengeData } = await supabase
      .from("challenges")
      .select("challenge")
      .eq("id", "registration")
      .single();

    if (!challengeData) {
      return NextResponse.json(
        { error: "Challenge não encontrado" },
        { status: 400 }
      );
    }

    const verification: VerifiedRegistrationResponse =
      await verifyRegistrationResponse({
        response: body,
        expectedChallenge: challengeData.challenge,
        expectedOrigin: ORIGIN,
        expectedRPID: RP_ID,
      });

    if (verification.verified && verification.registrationInfo) {
      const { credential } = verification.registrationInfo;

      // Store credential
      await supabase.from("credentials").insert({
        id: Buffer.from(credential.id).toString("base64url"),
        public_key: Buffer.from(credential.publicKey).toString("base64"),
        counter: credential.counter,
        user_label: "admin",
      });

      // Cleanup challenge
      await supabase.from("challenges").delete().eq("id", "registration");

      return NextResponse.json({ verified: true });
    }

    return NextResponse.json({ verified: false }, { status: 400 });
  } catch (error) {
    console.error("Registration verification error:", error);
    return NextResponse.json(
      { error: "Erro ao verificar registro" },
      { status: 500 }
    );
  }
}
