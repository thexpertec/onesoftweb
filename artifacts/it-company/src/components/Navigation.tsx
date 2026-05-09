import React from "react";
import { Link } from "wouter";
import { Menu, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navigation() {
  return (
    <header className="fixed top-0 w-full z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center group-hover:scale-105 transition-transform">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-white">PowerTech</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#products" className="text-sm text-muted-foreground hover:text-primary transition-colors">Products</a>
          <a href="#industries" className="text-sm text-muted-foreground hover:text-primary transition-colors">Industries</a>
          <a href="#themes" className="text-sm text-muted-foreground hover:text-primary transition-colors">PowerThemes</a>
          <a href="#stats" className="text-sm text-muted-foreground hover:text-primary transition-colors">Why Us</a>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Button variant="outline" className="border-border text-foreground hover:bg-secondary">Login</Button>
          <Button>Book Demo</Button>
        </div>

        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="w-6 h-6" />
        </Button>
      </div>
    </header>
  );
}
