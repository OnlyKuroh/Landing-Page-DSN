"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Plus,
  Search,
  Flame,
  Zap,
  Snowflake,
  Instagram,
  Mail,
  Phone,
  Trash2,
  Edit2,
  Copy,
  X,
  Check,
  ExternalLink,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

interface Lead {
  id: string;
  company: string;
  segment: string | null;
  city: string | null;
  instagram: string | null;
  email: string | null;
  whatsapp: string | null;
  classification: string;
  contact_status: string;
  notes: string | null;
  created_at: string;
}

const CLASSIFICATIONS = [
  { id: "hot", label: "Quente", icon: Flame, color: "bg-red-500/20 text-red-400 border-red-500/30" },
  { id: "warm", label: "Morno", icon: Zap, color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  { id: "cold", label: "Frio", icon: Snowflake, color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
];

const CONTACT_STATUSES = [
  { id: "not_contacted", label: "Não contatado", color: "text-bone/40" },
  { id: "email_sent", label: "Email enviado", color: "text-yellow-400" },
  { id: "responded", label: "Respondeu", color: "text-cognac" },
  { id: "meeting", label: "Reunião marcada", color: "text-green-400" },
  { id: "converted", label: "Convertido", color: "text-green-500" },
];

const SEGMENTS = [
  "Clínicas", "Restaurantes", "Moda", "Academias", "Imobiliárias",
  "E-commerce", "Advocacia", "Pet Shop", "Salão de Beleza", "Educação", "Outros",
];

const emptyLead: Omit<Lead, "id" | "created_at"> = {
  company: "",
  segment: "",
  city: "Goiânia",
  instagram: "",
  email: "",
  whatsapp: "",
  classification: "warm",
  contact_status: "not_contacted",
  notes: "",
};

function generateEmailTemplate(lead: Lead): string {
  return `Olá! Tudo bem?

Sou o Athila, designer especializado em criativos de alto impacto para redes sociais e branding.

Dei uma olhada no perfil da ${lead.company}${lead.instagram ? ` (@${lead.instagram.replace("@", "")})` : ""} e achei que o visual tem potencial, mas poderia ser mais estratégico pra gerar resultado real — tipo atrair mais clientes e se destacar da concorrência.

Já trabalhei com negócios de ${lead.segment || "segmentos parecidos"} e os resultados visuais fazem diferença direta no faturamento. Posso te mostrar rapidinho no meu portfólio: behance.net/athilapsd

Se fizer sentido, bora trocar uma ideia rápida no WhatsApp? Sem compromisso!

Abraço,
Athila Cabrall
Senior Visual Designer`;
}

export function LeadsPanel() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterClassification, setFilterClassification] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Lead | null>(null);
  const [formData, setFormData] = useState(emptyLead);
  const [emailModalLead, setEmailModalLead] = useState<Lead | null>(null);
  const [copied, setCopied] = useState(false);

  const fetchLeads = useCallback(async () => {
    const { data } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setLeads(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  function openNew() {
    setEditing(null);
    setFormData({ ...emptyLead });
    setModalOpen(true);
  }

  function openEdit(lead: Lead) {
    setEditing(lead);
    setFormData({
      company: lead.company,
      segment: lead.segment,
      city: lead.city,
      instagram: lead.instagram,
      email: lead.email,
      whatsapp: lead.whatsapp,
      classification: lead.classification,
      contact_status: lead.contact_status,
      notes: lead.notes,
    });
    setModalOpen(true);
  }

  async function handleSave() {
    if (!formData.company.trim()) return;

    if (editing) {
      await supabase
        .from("leads")
        .update({ ...formData, updated_at: new Date().toISOString() })
        .eq("id", editing.id);
    } else {
      // Check duplicate email
      if (formData.email) {
        const { data: existing } = await supabase
          .from("leads")
          .select("id")
          .eq("email", formData.email)
          .limit(1);
        if (existing && existing.length > 0) {
          alert("⚠️ Já existe um lead com este email!");
          return;
        }
      }
      await supabase.from("leads").insert(formData);
    }

    setModalOpen(false);
    fetchLeads();
  }

  async function handleDelete(id: string) {
    await supabase.from("leads").delete().eq("id", id);
    fetchLeads();
  }

  async function handleStatusChange(id: string, newStatus: string) {
    await supabase
      .from("leads")
      .update({ contact_status: newStatus, updated_at: new Date().toISOString() })
      .eq("id", id);
    fetchLeads();
  }

  function copyEmail(lead: Lead) {
    const template = generateEmailTemplate(lead);
    navigator.clipboard.writeText(template);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    setEmailModalLead(lead);
  }

  const filtered = leads.filter((lead) => {
    const matchesSearch =
      !searchQuery ||
      lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.segment?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.city?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      !filterClassification || lead.classification === filterClassification;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: leads.length,
    hot: leads.filter((l) => l.classification === "hot").length,
    warm: leads.filter((l) => l.classification === "warm").length,
    cold: leads.filter((l) => l.classification === "cold").length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-6 h-6 rounded-full border-2 border-cognac/30 border-t-cognac animate-spin" />
      </div>
    );
  }

  return (
    <>
      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total", value: stats.total, color: "text-bone" },
          { label: "Quentes 🔥", value: stats.hot, color: "text-red-400" },
          { label: "Mornos ⚡", value: stats.warm, color: "text-yellow-400" },
          { label: "Frios ❄️", value: stats.cold, color: "text-blue-400" },
        ].map((s) => (
          <div key={s.label} className="glass-card rounded-xl p-3 text-center">
            <p className={`text-xl font-tusker ${s.color}`}>{s.value}</p>
            <p className="text-[10px] text-bone/35 font-poppins uppercase tracking-wider">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-5">
        <div className="relative flex-1 w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-bone/25" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar empresa, segmento..."
            className="w-full bg-white/5 border border-border/30 rounded-xl pl-10 pr-4 py-2.5 text-sm text-bone font-poppins outline-none focus:border-cognac/40 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2">
          {CLASSIFICATIONS.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() =>
                setFilterClassification(filterClassification === c.id ? null : c.id)
              }
              className={`px-3 py-1.5 rounded-full text-[10px] font-poppins font-medium uppercase tracking-wider transition-all border ${
                filterClassification === c.id ? c.color : "bg-transparent border-border/30 text-bone/30"
              }`}
            >
              <c.icon className="inline h-3 w-3 mr-1" />
              {c.label}
            </button>
          ))}
        </div>

        <Button size="sm" className="rounded-full ml-auto" onClick={openNew}>
          <Plus className="mr-1.5 h-3.5 w-3.5" />
          Novo Lead
        </Button>
      </div>

      {/* Leads table */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border/20">
                {["Empresa", "Segmento", "Cidade", "Contato", "Status", "Ações"].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-[10px] uppercase tracking-wider text-bone/30 font-poppins font-medium"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {filtered.map((lead) => {
                const cls = CLASSIFICATIONS.find(
                  (c) => c.id === lead.classification
                );
                const status = CONTACT_STATUSES.find(
                  (s) => s.id === lead.contact_status
                );
                return (
                  <tr
                    key={lead.id}
                    className="border-b border-border/10 hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {cls && (
                          <Badge
                            variant="outline"
                            className={`text-[8px] ${cls.color}`}
                          >
                            <cls.icon className="h-2.5 w-2.5" />
                          </Badge>
                        )}
                        <span className="text-xs font-poppins font-bold text-bone">
                          {lead.company}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-bone/40 font-poppins">
                      {lead.segment || "—"}
                    </td>
                    <td className="px-4 py-3 text-xs text-bone/40 font-poppins">
                      {lead.city || "—"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {lead.instagram && (
                          <a
                            href={`https://instagram.com/${lead.instagram.replace("@", "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-bone/25 hover:text-cognac transition-colors"
                          >
                            <Instagram className="h-3.5 w-3.5" />
                          </a>
                        )}
                        {lead.email && (
                          <button
                            type="button"
                            onClick={() => copyEmail(lead)}
                            className="text-bone/25 hover:text-cognac transition-colors"
                            title="Gerar e copiar email"
                          >
                            <Mail className="h-3.5 w-3.5" />
                          </button>
                        )}
                        {lead.whatsapp && (
                          <a
                            href={`https://wa.me/55${lead.whatsapp.replace(/\D/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-bone/25 hover:text-[#25D366] transition-colors"
                          >
                            <Phone className="h-3.5 w-3.5" />
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={lead.contact_status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                        className={`bg-transparent text-[10px] font-poppins font-medium outline-none cursor-pointer ${
                          status?.color || "text-bone/40"
                        }`}
                      >
                        {CONTACT_STATUSES.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => openEdit(lead)}
                          className="p-1.5 text-bone/20 hover:text-cognac transition-colors"
                        >
                          <Edit2 className="h-3 w-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(lead.id)}
                          className="p-1.5 text-bone/20 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-xs text-bone/25 font-poppins">
                    Nenhum lead encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create/Edit Lead Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-lg flex items-center justify-center p-4"
            onClick={() => setModalOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="glass-card rounded-2xl p-6 sm:p-8 w-full max-w-lg space-y-5 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-poppins font-bold text-bone text-sm uppercase tracking-wide">
                  {editing ? "Editar Lead" : "Novo Lead"}
                </h3>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full h-8 w-8"
                  onClick={() => setModalOpen(false)}
                >
                  <X className="h-3.5 w-3.5" />
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-bone/35 font-poppins block mb-1.5">
                    Empresa *
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData((f) => ({ ...f, company: e.target.value }))}
                    className="w-full bg-white/5 border border-border/30 rounded-xl px-4 py-2.5 text-sm text-bone font-poppins outline-none focus:border-cognac/40 transition-colors"
                    placeholder="Ex: Clínica Beleza Pura"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-bone/35 font-poppins block mb-1.5">
                      Segmento
                    </label>
                    <select
                      value={formData.segment || ""}
                      onChange={(e) =>
                        setFormData((f) => ({ ...f, segment: e.target.value }))
                      }
                      className="w-full bg-white/5 border border-border/30 rounded-xl px-4 py-2.5 text-sm text-bone font-poppins outline-none focus:border-cognac/40 transition-colors"
                    >
                      <option value="">Selecionar...</option>
                      {SEGMENTS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-bone/35 font-poppins block mb-1.5">
                      Cidade
                    </label>
                    <input
                      type="text"
                      value={formData.city || ""}
                      onChange={(e) =>
                        setFormData((f) => ({ ...f, city: e.target.value }))
                      }
                      className="w-full bg-white/5 border border-border/30 rounded-xl px-4 py-2.5 text-sm text-bone font-poppins outline-none focus:border-cognac/40 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-bone/35 font-poppins block mb-1.5">
                      Instagram
                    </label>
                    <input
                      type="text"
                      value={formData.instagram || ""}
                      onChange={(e) =>
                        setFormData((f) => ({ ...f, instagram: e.target.value }))
                      }
                      className="w-full bg-white/5 border border-border/30 rounded-xl px-4 py-2.5 text-sm text-bone font-poppins outline-none focus:border-cognac/40 transition-colors"
                      placeholder="@perfil"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-bone/35 font-poppins block mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email || ""}
                      onChange={(e) =>
                        setFormData((f) => ({ ...f, email: e.target.value }))
                      }
                      className="w-full bg-white/5 border border-border/30 rounded-xl px-4 py-2.5 text-sm text-bone font-poppins outline-none focus:border-cognac/40 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-bone/35 font-poppins block mb-1.5">
                      WhatsApp
                    </label>
                    <input
                      type="text"
                      value={formData.whatsapp || ""}
                      onChange={(e) =>
                        setFormData((f) => ({ ...f, whatsapp: e.target.value }))
                      }
                      className="w-full bg-white/5 border border-border/30 rounded-xl px-4 py-2.5 text-sm text-bone font-poppins outline-none focus:border-cognac/40 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider text-bone/35 font-poppins block mb-1.5">
                    Classificação
                  </label>
                  <div className="flex gap-2">
                    {CLASSIFICATIONS.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() =>
                          setFormData((f) => ({ ...f, classification: c.id }))
                        }
                        className={`flex-1 py-2 rounded-xl text-xs font-poppins font-medium border transition-all ${
                          formData.classification === c.id
                            ? c.color
                            : "bg-transparent border-border/30 text-bone/30"
                        }`}
                      >
                        <c.icon className="inline h-3 w-3 mr-1" />
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider text-bone/35 font-poppins block mb-1.5">
                    Notas
                  </label>
                  <textarea
                    value={formData.notes || ""}
                    onChange={(e) =>
                      setFormData((f) => ({ ...f, notes: e.target.value }))
                    }
                    rows={3}
                    className="w-full bg-white/5 border border-border/30 rounded-xl px-4 py-2.5 text-sm text-bone font-poppins outline-none focus:border-cognac/40 transition-colors resize-none"
                    placeholder="Observações sobre o lead..."
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Button
                  className="flex-1 rounded-full"
                  onClick={handleSave}
                  disabled={!formData.company.trim()}
                >
                  {editing ? "Atualizar" : "Criar Lead"}
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full"
                  onClick={() => setModalOpen(false)}
                >
                  Cancelar
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Email template modal */}
      <AnimatePresence>
        {emailModalLead && (
          <motion.div
            className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-lg flex items-center justify-center p-4"
            onClick={() => setEmailModalLead(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="glass-card rounded-2xl p-6 sm:p-8 w-full max-w-lg space-y-4"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-poppins font-bold text-bone text-sm">
                  Email para {emailModalLead.company}
                </h3>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full h-8 w-8"
                  onClick={() => setEmailModalLead(null)}
                >
                  <X className="h-3.5 w-3.5" />
                </Button>
              </div>

              <pre className="bg-white/5 border border-border/20 rounded-xl p-4 text-xs text-bone/70 font-poppins whitespace-pre-wrap leading-relaxed max-h-[50vh] overflow-y-auto">
                {generateEmailTemplate(emailModalLead)}
              </pre>

              <div className="flex items-center gap-3">
                <Button
                  className="flex-1 rounded-full"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      generateEmailTemplate(emailModalLead)
                    );
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                >
                  {copied ? (
                    <Check className="mr-1.5 h-3.5 w-3.5" />
                  ) : (
                    <Copy className="mr-1.5 h-3.5 w-3.5" />
                  )}
                  {copied ? "Copiado!" : "Copiar Email"}
                </Button>
                {emailModalLead.email && (
                  <Button variant="outline" className="rounded-full" asChild>
                    <a
                      href={`mailto:${emailModalLead.email}?subject=Posso ajudar a ${emailModalLead.company} com design estratégico&body=${encodeURIComponent(generateEmailTemplate(emailModalLead))}`}
                    >
                      <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                      Abrir Gmail
                    </a>
                  </Button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
