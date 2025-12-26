import { LayoutDashboard, Bell, Settings } from "lucide-react";
import { Button } from "./ui/button";

export const Header = () => {
  return (
    <header className="glass-card border-b border-border/50 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side: Logo + Title */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center">
            <LayoutDashboard className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">
              Executive Dashboard
            </h1>
            <p className="text-xs text-muted-foreground">
              Financial Overview • Q4 2024
            </p>
          </div>
        </div>

        {/* Right side: Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground hover:bg-secondary"
          >
            <Bell className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground hover:bg-secondary"
          >
            <Settings className="w-4 h-4" />
          </Button>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-chart-2 flex items-center justify-center text-xs font-medium text-primary-foreground ml-2">
            JD
          </div>
        </div>
      </div>
    </header>
  );
};