"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, GripVertical, Calendar, DollarSign, Trash2, Edit2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

interface Project {
  id: string;
  client_name: string;
  client_email: string | null;
  project_type: string | null;
  value: number | null;
  deadline: string | null;
  priority: string;
  status: string;
  notes: string | null;
  created_at: string;
}

const COLUMNS = [
  { id: "leads", label: "Leads", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  { id: "negotiation", label: "Em Negociação", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  { id: "in_progress", label: "Em Andamento", color: "bg-cognac/20 text-cognac border-cognac/30" },
  { id: "done", label: "Concluído", color: "bg-green-500/20 text-green-400 border-green-500/30" },
];

const PRIORITY_COLORS: Record<string, string> = {
  high: "bg-red-500/20 text-red-400 border-red-500/30",
  medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  low: "bg-bone/10 text-bone/40 border-bone/20",
};

const emptyProject: Omit<Project, "id" | "created_at"> = {
  client_name: "",
  client_email: "",
  project_type: "",
  value: null,
  deadline: null,
  priority: "medium",
  status: "leads",
  notes: "",
};

export function KanbanBoard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [formData, setFormData] = useState(emptyProject);
  const [draggedId, setDraggedId] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    const { data } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setProjects(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  function openNew(status: string) {
    setEditing(null);
    setFormData({ ...emptyProject, status });
    setModalOpen(true);
  }

  function openEdit(project: Project) {
    setEditing(project);
    setFormData({
      client_name: project.client_name,
      client_email: project.client_email,
      project_type: project.project_type,
      value: project.value,
      deadline: project.deadline,
      priority: project.priority,
      status: project.status,
      notes: project.notes,
    });
    setModalOpen(true);
  }

  async function handleSave() {
    if (!formData.client_name.trim()) return;

    if (editing) {
      await supabase
        .from("projects")
        .update({ ...formData, updated_at: new Date().toISOString() })
        .eq("id", editing.id);
    } else {
      await supabase.from("projects").insert(formData);
    }

    setModalOpen(false);
    fetchProjects();
  }

  async function handleDelete(id: string) {
    await supabase.from("projects").delete().eq("id", id);
    fetchProjects();
  }

  async function handleDrop(newStatus: string) {
    if (!draggedId) return;
    await supabase
      .from("projects")
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq("id", draggedId);
    setDraggedId(null);
    fetchProjects();
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-6 h-6 rounded-full border-2 border-cognac/30 border-t-cognac animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {COLUMNS.map((col) => {
          const colProjects = projects.filter((p) => p.status === col.id);
          return (
            <div
              key={col.id}
              className="flex flex-col"
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(col.id)}
            >
              {/* Column header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={`text-[10px] ${col.color}`}>
                    {col.label}
                  </Badge>
                  <span className="text-[10px] text-bone/25 font-poppins">
                    {colProjects.length}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => openNew(col.id)}
                  className="p-1 text-bone/30 hover:text-cognac transition-colors"
                  aria-label={`Adicionar em ${col.label}`}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              {/* Cards */}
              <div className="space-y-2 min-h-[120px] p-2 rounded-xl border border-dashed border-border/30 bg-white/[0.01]">
                {colProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    draggable
                    onDragStart={() => setDraggedId(project.id)}
                    onDragEnd={() => setDraggedId(null)}
                    className={`glass-card rounded-xl p-3 cursor-grab active:cursor-grabbing transition-all hover:border-cognac/20 ${
                      draggedId === project.id ? "opacity-50" : ""
                    }`}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <GripVertical className="h-3 w-3 text-bone/15 shrink-0" />
                        <p className="text-xs font-poppins font-bold text-bone truncate">
                          {project.client_name}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className={`text-[8px] shrink-0 ${
                          PRIORITY_COLORS[project.priority] || PRIORITY_COLORS.medium
                        }`}
                      >
                        {project.priority === "high"
                          ? "Alta"
                          : project.priority === "low"
                          ? "Baixa"
                          : "Média"}
                      </Badge>
                    </div>

                    {project.project_type && (
                      <p className="text-[10px] text-bone/35 font-poppins mt-1 truncate">
                        {project.project_type}
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/20">
                      <div className="flex items-center gap-3">
                        {project.value && (
                          <span className="flex items-center gap-0.5 text-[10px] text-cognac font-poppins">
                            <DollarSign className="h-2.5 w-2.5" />
                            {project.value.toLocaleString("pt-BR")}
                          </span>
                        )}
                        {project.deadline && (
                          <span className="flex items-center gap-0.5 text-[10px] text-bone/30 font-poppins">
                            <Calendar className="h-2.5 w-2.5" />
                            {new Date(project.deadline).toLocaleDateString("pt-BR")}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => openEdit(project)}
                          className="p-1 text-bone/20 hover:text-cognac transition-colors"
                        >
                          <Edit2 className="h-3 w-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(project.id)}
                          className="p-1 text-bone/20 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Create/Edit modal */}
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
              className="glass-card rounded-2xl p-6 sm:p-8 w-full max-w-lg space-y-5"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-poppins font-bold text-bone text-sm uppercase tracking-wide">
                  {editing ? "Editar Projeto" : "Novo Projeto"}
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
                    Nome do Cliente *
                  </label>
                  <input
                    type="text"
                    value={formData.client_name}
                    onChange={(e) => setFormData((f) => ({ ...f, client_name: e.target.value }))}
                    className="w-full bg-white/5 border border-border/30 rounded-xl px-4 py-2.5 text-sm text-bone font-poppins outline-none focus:border-cognac/40 transition-colors"
                    placeholder="Ex: Maria Silva"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-bone/35 font-poppins block mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.client_email || ""}
                      onChange={(e) =>
                        setFormData((f) => ({ ...f, client_email: e.target.value }))
                      }
                      className="w-full bg-white/5 border border-border/30 rounded-xl px-4 py-2.5 text-sm text-bone font-poppins outline-none focus:border-cognac/40 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-bone/35 font-poppins block mb-1.5">
                      Tipo de Projeto
                    </label>
                    <input
                      type="text"
                      value={formData.project_type || ""}
                      onChange={(e) =>
                        setFormData((f) => ({ ...f, project_type: e.target.value }))
                      }
                      className="w-full bg-white/5 border border-border/30 rounded-xl px-4 py-2.5 text-sm text-bone font-poppins outline-none focus:border-cognac/40 transition-colors"
                      placeholder="Ex: Social Media"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-bone/35 font-poppins block mb-1.5">
                      Valor (R$)
                    </label>
                    <input
                      type="number"
                      value={formData.value ?? ""}
                      onChange={(e) =>
                        setFormData((f) => ({
                          ...f,
                          value: e.target.value ? Number(e.target.value) : null,
                        }))
                      }
                      className="w-full bg-white/5 border border-border/30 rounded-xl px-4 py-2.5 text-sm text-bone font-poppins outline-none focus:border-cognac/40 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-bone/35 font-poppins block mb-1.5">
                      Prazo
                    </label>
                    <input
                      type="date"
                      value={formData.deadline || ""}
                      onChange={(e) =>
                        setFormData((f) => ({ ...f, deadline: e.target.value || null }))
                      }
                      className="w-full bg-white/5 border border-border/30 rounded-xl px-4 py-2.5 text-sm text-bone font-poppins outline-none focus:border-cognac/40 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-bone/35 font-poppins block mb-1.5">
                      Prioridade
                    </label>
                    <select
                      value={formData.priority}
                      onChange={(e) =>
                        setFormData((f) => ({ ...f, priority: e.target.value }))
                      }
                      className="w-full bg-white/5 border border-border/30 rounded-xl px-4 py-2.5 text-sm text-bone font-poppins outline-none focus:border-cognac/40 transition-colors"
                    >
                      <option value="low">Baixa</option>
                      <option value="medium">Média</option>
                      <option value="high">Alta</option>
                    </select>
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
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Button
                  className="flex-1 rounded-full"
                  onClick={handleSave}
                  disabled={!formData.client_name.trim()}
                >
                  {editing ? "Atualizar" : "Criar Projeto"}
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
    </>
  );
}
