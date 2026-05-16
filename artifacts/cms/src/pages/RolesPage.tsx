import { useState } from "react";
import { Layout, PageHeader, Btn, Badge } from "@/components/Layout";
import {
  Shield, Users, Plus, Edit2, Trash2, Check, X, Crown,
  Eye, Pen, Eraser, Settings, MoreHorizontal, Mail,
  ChevronDown, Lock, Unlock,
} from "lucide-react";

/* ── Data ────────────────────────────────────────────────── */
const MODULES = [
  "Content",
  "Homepage Sections",
  "Products & Services",
  "Company",
  "Site Settings",
  "Media Library",
  "Admin Users",
];

type PermLevel = "full" | "edit" | "view" | "none";

interface Role {
  id: string;
  name: string;
  description: string;
  color: string;
  badge: "blue" | "green" | "yellow" | "red" | "default";
  userCount: number;
  isSystem: boolean;
  permissions: Record<string, PermLevel>;
}

const DEFAULT_ROLES: Role[] = [
  {
    id: "super-admin",
    name: "Super Admin",
    description: "Unrestricted access to every section, setting, and user.",
    color: "#1E4DA0",
    badge: "blue",
    userCount: 1,
    isSystem: true,
    permissions: Object.fromEntries(MODULES.map(m => [m, "full" as PermLevel])),
  },
  {
    id: "admin",
    name: "Admin",
    description: "Full content control. Cannot manage other admin accounts.",
    color: "#16a34a",
    badge: "green",
    userCount: 2,
    isSystem: false,
    permissions: {
      "Content": "full",
      "Homepage Sections": "full",
      "Products & Services": "full",
      "Company": "full",
      "Site Settings": "edit",
      "Media Library": "full",
      "Admin Users": "none",
    },
  },
  {
    id: "editor",
    name: "Editor",
    description: "Create and edit content. Cannot delete records or change settings.",
    color: "#d97706",
    badge: "yellow",
    userCount: 3,
    isSystem: false,
    permissions: {
      "Content": "edit",
      "Homepage Sections": "edit",
      "Products & Services": "edit",
      "Company": "edit",
      "Site Settings": "view",
      "Media Library": "edit",
      "Admin Users": "none",
    },
  },
  {
    id: "viewer",
    name: "Viewer",
    description: "Read-only access. Cannot create, edit, or delete anything.",
    color: "#6b7280",
    badge: "default",
    userCount: 1,
    isSystem: false,
    permissions: Object.fromEntries(MODULES.map(m => [m, "view" as PermLevel])),
  },
];

interface AdminUser {
  id: number;
  name: string;
  email: string;
  avatar: string;
  roleId: string;
  lastActive: string;
  status: "active" | "invited" | "suspended";
}

const DEFAULT_USERS: AdminUser[] = [
  { id: 1, name: "Sarah Mitchell",  email: "admin@onesoft.org.uk",  avatar: "SM", roleId: "super-admin", lastActive: "Just now",     status: "active" },
  { id: 2, name: "James Whitfield", email: "james@onesoft.org.uk",  avatar: "JW", roleId: "admin",       lastActive: "2 hours ago",  status: "active" },
  { id: 3, name: "Priya Menon",     email: "priya@onesoft.org.uk",  avatar: "PM", roleId: "admin",       lastActive: "Yesterday",    status: "active" },
  { id: 4, name: "Adam Thornton",   email: "adam@onesoft.org.uk",   avatar: "AT", roleId: "editor",      lastActive: "3 days ago",   status: "active" },
  { id: 5, name: "Mariam Yousaf",   email: "mariam@onesoft.org.uk", avatar: "MY", roleId: "editor",      lastActive: "1 week ago",   status: "active" },
  { id: 6, name: "Rania Hashim",    email: "rania@onesoft.org.uk",  avatar: "RH", roleId: "editor",      lastActive: "5 days ago",   status: "active" },
  { id: 7, name: "Khalid Al-Rashid",email: "khalid@onesoft.org.uk", avatar: "KR", roleId: "viewer",      lastActive: "2 weeks ago",  status: "active" },
  { id: 8, name: "New Hire",        email: "hire@onesoft.org.uk",   avatar: "NH", roleId: "editor",      lastActive: "—",            status: "invited" },
];

/* ── Helpers ─────────────────────────────────────────────── */
const PERM_CONFIG: Record<PermLevel, { label: string; icon: React.ElementType; bg: string; text: string }> = {
  full: { label: "Full",   icon: Unlock,  bg: "bg-blue-50",   text: "text-blue-700" },
  edit: { label: "Edit",   icon: Pen,     bg: "bg-amber-50",  text: "text-amber-700" },
  view: { label: "View",   icon: Eye,     bg: "bg-gray-100",  text: "text-gray-600" },
  none: { label: "None",   icon: Lock,    bg: "bg-red-50",    text: "text-red-400" },
};

const PERM_CYCLE: PermLevel[] = ["full", "edit", "view", "none"];

function PermCell({
  level,
  editable,
  onCycle,
}: {
  level: PermLevel;
  editable: boolean;
  onCycle?: () => void;
}) {
  const cfg = PERM_CONFIG[level];
  const Icon = cfg.icon;
  return (
    <button
      onClick={editable ? onCycle : undefined}
      disabled={!editable}
      title={editable ? "Click to cycle permission" : "System role — cannot be changed"}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all
        ${cfg.bg} ${cfg.text}
        ${editable ? "cursor-pointer hover:opacity-80 ring-1 ring-transparent hover:ring-current/30" : "cursor-default opacity-80"}`}
    >
      <Icon className="w-3 h-3 shrink-0" />
      {cfg.label}
    </button>
  );
}

function StatusBadge({ status }: { status: AdminUser["status"] }) {
  if (status === "active")    return <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700"><span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />Active</span>;
  if (status === "invited")   return <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700"><span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />Invited</span>;
  return <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-red-100 text-red-700"><span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />Suspended</span>;
}

/* ── Invite modal ────────────────────────────────────────── */
function InviteModal({ roles, onClose }: { roles: Role[]; onClose: () => void }) {
  const [form, setForm] = useState({ name: "", email: "", roleId: "editor" });
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-black text-foreground">Invite Admin User</h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Full name</label>
            <input
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              placeholder="e.g. Alex Johnson"
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/15 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Email address</label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              placeholder="e.g. alex@onesoft.org.uk"
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/15 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Role</label>
            <select
              value={form.roleId}
              onChange={e => setForm(f => ({ ...f, roleId: e.target.value }))}
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/15 transition-all"
            >
              {roles.map(r => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
            </select>
          </div>
          <p className="text-[11px] text-muted-foreground bg-muted rounded-lg px-3 py-2">
            An invitation email will be sent to this address. They'll set their own password on first login.
          </p>
        </div>
        <div className="flex gap-3 mt-6">
          <Btn variant="secondary" onClick={onClose} className="flex-1">Cancel</Btn>
          <Btn
            variant="primary"
            className="flex-1"
            onClick={onClose}
            disabled={!form.name || !form.email}
          >
            <Mail className="w-3.5 h-3.5" /> Send Invite
          </Btn>
        </div>
      </div>
    </div>
  );
}

/* ── Permissions matrix tab ──────────────────────────────── */
function PermissionsMatrix({
  roles,
  onUpdate,
}: {
  roles: Role[];
  onUpdate: (roleId: string, module: string, level: PermLevel) => void;
}) {
  return (
    <div className="space-y-6">
      {/* Role cards summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {roles.map(role => (
          <div key={role.id} className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: role.color + "20" }}
              >
                {role.id === "super-admin" ? (
                  <Crown className="w-4 h-4" style={{ color: role.color }} />
                ) : (
                  <Shield className="w-4 h-4" style={{ color: role.color }} />
                )}
              </div>
              {role.isSystem && (
                <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground">System</span>
              )}
            </div>
            <p className="text-sm font-bold text-foreground">{role.name}</p>
            <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2">{role.description}</p>
            <p className="text-[10px] text-muted-foreground mt-2 font-medium">{role.userCount} user{role.userCount !== 1 ? "s" : ""}</p>
          </div>
        ))}
      </div>

      {/* Matrix table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="px-5 py-3.5 border-b border-border bg-muted/40">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Permissions Matrix</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground w-44">Module</th>
                {roles.map(role => (
                  <th key={role.id} className="text-center px-4 py-3 text-xs font-bold text-foreground min-w-[120px]">
                    <span className="flex items-center justify-center gap-1.5">
                      {role.isSystem && <Crown className="w-3 h-3 text-primary" />}
                      {role.name}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {MODULES.map(mod => (
                <tr key={mod} className="hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-3 text-sm font-medium text-foreground whitespace-nowrap">{mod}</td>
                  {roles.map(role => {
                    const level = role.permissions[mod] ?? "none";
                    const idx = PERM_CYCLE.indexOf(level);
                    return (
                      <td key={role.id} className="px-4 py-3 text-center">
                        <div className="flex justify-center">
                          <PermCell
                            level={level}
                            editable={!role.isSystem}
                            onCycle={() => {
                              const next = PERM_CYCLE[(idx + 1) % PERM_CYCLE.length];
                              onUpdate(role.id, mod, next);
                            }}
                          />
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-border bg-muted/20 flex flex-wrap items-center gap-4">
          <span className="text-[11px] text-muted-foreground font-medium">Permission levels:</span>
          {(Object.entries(PERM_CONFIG) as [PermLevel, typeof PERM_CONFIG[PermLevel]][]).map(([key, cfg]) => {
            const Icon = cfg.icon;
            return (
              <span key={key} className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.text}`}>
                <Icon className="w-3 h-3" /> {cfg.label}
              </span>
            );
          })}
          <span className="text-[11px] text-muted-foreground ml-2">· Click any cell to cycle permission (non-system roles only)</span>
        </div>
      </div>
    </div>
  );
}

/* ── Admin Users tab ─────────────────────────────────────── */
function AdminUsersPanel({
  users,
  roles,
  onInvite,
  onRoleChange,
  onRemove,
}: {
  users: AdminUser[];
  roles: Role[];
  onInvite: () => void;
  onRoleChange: (userId: number, roleId: string) => void;
  onRemove: (userId: number) => void;
}) {
  const getRoleName = (id: string) => roles.find(r => r.id === id)?.name ?? id;
  const getRoleBadge = (id: string) => roles.find(r => r.id === id)?.badge ?? "default";

  return (
    <div className="space-y-4">
      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {roles.map(role => {
          const count = users.filter(u => u.roleId === role.id).length;
          return (
            <div key={role.id} className="bg-card border border-border rounded-xl px-4 py-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: role.color + "20" }}>
                <Shield className="w-4 h-4" style={{ color: role.color }} />
              </div>
              <div>
                <p className="text-lg font-black text-foreground leading-none">{count}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{role.name}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Users table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="px-5 py-3.5 border-b border-border flex items-center justify-between">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
            Admin Users <span className="ml-2 px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground text-[10px]">{users.length}</span>
          </p>
          <Btn size="sm" onClick={onInvite}>
            <Plus className="w-3.5 h-3.5" /> Invite User
          </Btn>
        </div>
        <div className="divide-y divide-border">
          {users.map(user => (
            <div key={user.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-muted/30 transition-colors">
              {/* Avatar */}
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-black text-white shrink-0"
                style={{ background: roles.find(r => r.id === user.roleId)?.color ?? "#6b7280" }}
              >
                {user.avatar}
              </div>
              {/* Name + email */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-semibold text-foreground">{user.name}</p>
                  <StatusBadge status={user.status} />
                </div>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              </div>
              {/* Last active */}
              <p className="text-xs text-muted-foreground hidden md:block w-24 text-right shrink-0">{user.lastActive}</p>
              {/* Role dropdown */}
              <div className="shrink-0">
                <div className="relative">
                  <select
                    value={user.roleId}
                    onChange={e => onRoleChange(user.id, e.target.value)}
                    disabled={user.id === 1}
                    className="appearance-none pl-2.5 pr-7 py-1.5 rounded-lg border border-border bg-background text-xs font-semibold text-foreground outline-none focus:border-primary/50 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {roles.map(r => (
                      <option key={r.id} value={r.id}>{r.name}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground pointer-events-none" />
                </div>
              </div>
              {/* Remove */}
              <button
                onClick={() => onRemove(user.id)}
                disabled={user.id === 1}
                title={user.id === 1 ? "Cannot remove the primary Super Admin" : "Remove user"}
                className="shrink-0 w-7 h-7 flex items-center justify-center rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────── */
const TABS = [
  { id: "permissions", label: "Roles & Permissions", icon: Shield },
  { id: "users",       label: "Admin Users",         icon: Users },
];

export default function RolesPage() {
  const [tab, setTab] = useState<"permissions" | "users">("permissions");
  const [roles, setRoles] = useState<Role[]>(DEFAULT_ROLES);
  const [users, setUsers] = useState<AdminUser[]>(DEFAULT_USERS);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  const handlePermUpdate = (roleId: string, mod: string, level: PermLevel) => {
    setRoles(prev =>
      prev.map(r =>
        r.id === roleId
          ? { ...r, permissions: { ...r.permissions, [mod]: level } }
          : r
      )
    );
  };

  const handleRoleChange = (userId: number, roleId: string) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, roleId } : u));
    setRoles(prev =>
      prev.map(r => ({
        ...r,
        userCount: users.filter(u => (u.id === userId ? roleId : u.roleId) === r.id).length,
      }))
    );
  };

  const handleRemove = (userId: number) => {
    setUsers(prev => prev.filter(u => u.id !== userId));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <Layout>
      <div className="p-6 max-w-6xl">
        <PageHeader
          title="Roles & Permissions"
          description="Manage who can access what across the CMS."
          action={
            <Btn onClick={handleSave}>
              {saved ? <><Check className="w-3.5 h-3.5" /> Saved</> : "Save Changes"}
            </Btn>
          }
        />

        {/* Sub-tabs */}
        <div className="flex gap-1 mb-6 border-b border-border">
          {TABS.map(t => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-all ${
                  tab === t.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="w-4 h-4" />
                {t.label}
              </button>
            );
          })}
        </div>

        {tab === "permissions" && (
          <PermissionsMatrix roles={roles} onUpdate={handlePermUpdate} />
        )}
        {tab === "users" && (
          <AdminUsersPanel
            users={users}
            roles={roles}
            onInvite={() => setInviteOpen(true)}
            onRoleChange={handleRoleChange}
            onRemove={handleRemove}
          />
        )}
      </div>

      {inviteOpen && (
        <InviteModal roles={roles} onClose={() => setInviteOpen(false)} />
      )}
    </Layout>
  );
}
