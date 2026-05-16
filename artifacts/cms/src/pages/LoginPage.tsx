import { useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { Eye, EyeOff, LogIn, Loader2 } from "lucide-react";

export default function LoginPage() {
  const { login } = useAuth();
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("admin@onesoft.org.uk");
  const [password, setPassword] = useState("demo1234");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const ok = await login(email, password);
    setLoading(false);
    if (ok) setLocation("/");
    else setError("Invalid email or password. Try the demo credentials below.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center gap-2.5 justify-center mb-8">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "#1E4DA0" }}>
            <span className="text-white font-black text-base tracking-tight">O</span>
          </div>
          <div>
            <p className="font-black text-foreground text-base leading-none">OneSoft</p>
            <p className="text-[11px] text-muted-foreground font-medium mt-0.5">CMS Admin</p>
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border shadow-sm p-7">
          <h1 className="text-xl font-black text-foreground mb-1">Sign in</h1>
          <p className="text-sm text-muted-foreground mb-6">Enter your admin credentials to continue.</p>

          <form onSubmit={handle} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">Email address</label>
              <input
                type="email" required value={email} onChange={e => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                placeholder="you@onesoft.org.uk"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"} required value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 pr-10 rounded-lg border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowPw(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-xs text-destructive bg-destructive/8 border border-destructive/20 rounded-lg px-3 py-2.5">
                {error}
              </p>
            )}

            <button type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold text-white transition-all disabled:opacity-70 hover:opacity-90"
              style={{ background: "#1E4DA0" }}>
              {loading
                ? <><Loader2 className="w-4 h-4 animate-spin" /> Signing in…</>
                : <><LogIn className="w-4 h-4" /> Sign in</>}
            </button>
          </form>

          <div className="mt-5 pt-5 border-t border-border">
            <p className="text-[11px] text-muted-foreground font-medium mb-2">Demo credentials</p>
            <div className="bg-muted rounded-lg px-3 py-2 space-y-0.5">
              <p className="text-xs font-mono text-foreground">admin@onesoft.org.uk</p>
              <p className="text-xs font-mono text-foreground">demo1234</p>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-5">
          OneSoft CMS · Admin access only
        </p>
      </div>
    </div>
  );
}
