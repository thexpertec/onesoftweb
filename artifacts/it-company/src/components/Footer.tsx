import React from "react";
import { Zap } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-white">PowerTech</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Precision-engineered ERP systems and premium website themes for modern businesses.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">ERP Solutions</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">School ERP</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Hospital ERP</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">E-commerce ERP</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Restaurant ERP</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Careers</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Case Studies</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">SLA Agreement</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} PowerTech Solutions. All rights reserved.</p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>System Status: <span className="text-primary">99.9% Uptime</span></span>
          </div>
        </div>
      </div>
    </footer>
  );
}
