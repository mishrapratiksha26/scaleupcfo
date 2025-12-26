import { useState, useRef, useCallback } from "react";
import { X, Send, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export const SelectionOverlay = ({ children }) => {
  const containerRef = useRef(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selection, setSelection] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");

  const handleMouseDown = useCallback((e) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = containerRef.current.scrollTop;
    const scrollLeft = containerRef.current.scrollLeft;

    const startX = e.clientX - rect.left + scrollLeft;
    const startY = e.clientY - rect.top + scrollTop;

    setIsSelecting(true);
    setShowPopup(false);
    setResponse("");
    setSelection({
      startX,
      startY,
      endX: startX,
      endY: startY,
    });
  }, []);

  const handleMouseMove = useCallback(
    (e) => {
      if (!isSelecting || !containerRef.current || !selection) return;

      const rect = containerRef.current.getBoundingClientRect();
      const scrollTop = containerRef.current.scrollTop;
      const scrollLeft = containerRef.current.scrollLeft;

      const endX = e.clientX - rect.left + scrollLeft;
      const endY = e.clientY - rect.top + scrollTop;

      setSelection((prev) => (prev ? { ...prev, endX, endY } : null));
    },
    [isSelecting, selection]
  );

  const handleMouseUp = useCallback(() => {
    if (!isSelecting || !selection || !containerRef.current) {
      setIsSelecting(false);
      return;
    }

    const width = Math.abs(selection.endX - selection.startX);
    const height = Math.abs(selection.endY - selection.startY);

    // Only show popup if selection is large enough (at least 20x20)
    if (width >= 20 && height >= 20) {
      const rect = containerRef.current.getBoundingClientRect();
      const scrollTop = containerRef.current.scrollTop;

      // Position popup near the selection
      const popupX = Math.min(selection.startX, selection.endX) + width / 2;
      const popupY = Math.max(selection.startY, selection.endY) - scrollTop + 10;

      setPopupPosition({
        x: Math.min(popupX, rect.width - 320),
        y: Math.min(popupY, rect.height - 200),
      });
      setShowPopup(true);
    } else {
      setSelection(null);
    }

    setIsSelecting(false);
  }, [isSelecting, selection]);

  const handleClose = () => {
    setShowPopup(false);
    setSelection(null);
    setQuery("");
    setResponse("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Simulate AI response
    setResponse(
      `Analyzing selected area: "${query}" — The highlighted data shows strong performance indicators with a 15% improvement over the previous period. Key drivers include increased conversion rates and reduced churn.`
    );
    setQuery("");
  };

  const getSelectionStyle = () => {
    if (!selection) return {};

    const left = Math.min(selection.startX, selection.endX);
    const top = Math.min(selection.startY, selection.endY);
    const width = Math.abs(selection.endX - selection.startX);
    const height = Math.abs(selection.endY - selection.startY);

    return {
      left: `${left}px`,
      top: `${top}px`,
      width: `${width}px`,
      height: `${height}px`,
    };
  };

  return (
    <div
      ref={containerRef}
      className="relative flex-1 overflow-y-auto"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{ cursor: isSelecting ? "crosshair" : "default" }}
    >
      {children}

      {/* Selection Rectangle */}
      {selection && (
        <div
          className="absolute pointer-events-none border-2 border-primary rounded-sm z-10"
          style={{
            ...getSelectionStyle(),
            backgroundColor: "transparent",
          }}
        />
      )}

      {/* Context Popup */}
      {showPopup && (
        <div
          className="absolute z-20 w-80 glass-card rounded-lg border border-primary/30 shadow-lg animate-fade-in"
          style={{
            left: `${popupPosition.x}px`,
            top: `${popupPosition.y}px`,
          }}
        >
          <div className="p-3 border-b border-border/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">
                Ask about selection
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-muted-foreground hover:text-foreground"
              onClick={handleClose}
            >
              <X className="w-3.5 h-3.5" />
            </Button>
          </div>

          <div className="p-3">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="What would you like to know?"
                className="flex-1 h-8 text-sm bg-secondary/50 border-border/50"
                autoFocus
              />
              <Button
                type="submit"
                size="icon"
                className="h-8 w-8 bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={!query.trim()}
              >
                <Send className="w-3.5 h-3.5" />
              </Button>
            </form>

            {response && (
              <div className="mt-3 p-2.5 bg-secondary/30 rounded-md">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {response}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};