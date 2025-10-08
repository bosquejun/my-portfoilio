"use client";

import { TEMPLATES, TemplateType } from "@/lib/template-config";
import { cn } from "@/lib/utils";
import { Palette, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface TemplateSwitcherProps {
  currentTemplate: TemplateType;
  onTemplateChange: (template: TemplateType) => void;
}

export function TemplateSwitcher({ currentTemplate, onTemplateChange }: TemplateSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center group"
        aria-label="Switch template"
      >
        <Palette className="h-5 w-5 group-hover:scale-110 transition-transform" />
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
            >
              <div className="bg-background border rounded-2xl shadow-2xl p-6 m-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold">Choose Template</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      Select your preferred design style
                    </p>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center transition-colors"
                    aria-label="Close"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Template Options */}
                <div className="space-y-3">
                  {(Object.keys(TEMPLATES) as TemplateType[]).map((template) => {
                    const isActive = currentTemplate === template;
                    return (
                      <button
                        key={template}
                        onClick={() => {
                          onTemplateChange(template);
                          setIsOpen(false);
                        }}
                        className={cn(
                          "w-full p-4 rounded-xl border-2 transition-all text-left",
                          isActive
                            ? "border-primary bg-primary/5 shadow-sm"
                            : "border-border hover:border-primary/50 hover:bg-muted/50"
                        )}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">
                              {TEMPLATES[template].name}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              {TEMPLATES[template].description}
                            </p>
                          </div>
                          {isActive && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-6 h-6 rounded-full bg-primary flex items-center justify-center ml-3"
                            >
                              <svg
                                className="w-4 h-4 text-primary-foreground"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path d="M5 13l4 4L19 7"></path>
                              </svg>
                            </motion.div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Info */}
                <p className="text-xs text-muted-foreground mt-4 text-center">
                  Your preference will be saved locally
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
