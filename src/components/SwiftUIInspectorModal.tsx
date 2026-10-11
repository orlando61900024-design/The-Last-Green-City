import React, { useState } from 'react';
import { X, Copy, Check, Sparkles, RefreshCw, Send, Code, Terminal, Play } from 'lucide-react';
import { TurnScenarioJSON } from '../types/game';
import { sound } from '../services/sound';

interface SwiftUIInspectorModalProps {
  currentScenario: TurnScenarioJSON;
  onPlayScenario: (scenario: TurnScenarioJSON) => void;
  onClose: () => void;
}

export const SwiftUIInspectorModal: React.FC<SwiftUIInspectorModalProps> = ({
  currentScenario,
  onPlayScenario,
  onClose,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [copiedSwift, setCopiedSwift] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'json' | 'swift'>('json');

  // Generator State
  const [targetSdg, setTargetSdg] = useState<number>(currentScenario.sdg_number || 6);
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedScenario, setGeneratedScenario] = useState<TurnScenarioJSON | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const displayScenario = generatedScenario || currentScenario;
  const jsonString = JSON.stringify(displayScenario, null, 2);

  const swiftStructCode = `//
//  TurnScenario.swift
//  The Last Green City - SwiftUI Data Model
//

import Foundation

struct MetricImpact: Codable {
    let resource_stability: Int?
    let ecological_health: Int?
    let community_well_being: Int?
}

struct ScenarioOption: Codable, Identifiable {
    var id: String { text }
    let text: String
    let is_correct: Bool
    let metric_impact: MetricImpact
    let feedback: String
}

struct TurnScenario: Codable, Identifiable {
    var id: String { sdg_goal }
    let sdg_goal: String
    let sdg_number: Int?
    let character_dialogue: String
    let location_background: String
    let question: String
    let options: [ScenarioOption]
    let mini_game_prompt: String
    let mini_game_type: String?
}
`;

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    sound.playClick();
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopySwift = () => {
    navigator.clipboard.writeText(swiftStructCode);
    setCopiedSwift(true);
    sound.playClick();
    setTimeout(() => setCopiedSwift(false), 2000);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setErrorMessage(null);
    sound.playClick();

    try {
      const response = await fetch('/api/director/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sdg_number: targetSdg,
          custom_context: customPrompt.trim() || undefined,
        }),
      });

      const data = await response.json();
      if (data.success && data.scenario) {
        setGeneratedScenario(data.scenario);
        sound.playSuccess();
      } else {
        setErrorMessage('Could not generate scenario.');
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Network error.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-indigo-500/40 rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col font-['Plus_Jakarta_Sans']">
        {/* Header */}
        <div className="bg-slate-950/90 border-b border-indigo-900/50 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-950 border border-indigo-500/50 flex items-center justify-center text-indigo-400">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-['Fredoka']">
                SwiftUI Data Bridge &amp; AI Game Director
              </h2>
              <p className="text-xs text-indigo-300">
                Live JSON schema matching SwiftUI Codable output &amp; real-time Gemini generation
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* AI Director Generator Form */}
          <div className="bg-slate-950/80 p-4 rounded-2xl border border-indigo-900/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Gemini AI Game Director Generator
              </span>
              <span className="text-[10px] text-slate-400">Real-time structured generation</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs text-slate-300 block mb-1">Target SDG (1–17):</label>
                <select
                  value={targetSdg}
                  onChange={(e) => setTargetSdg(parseInt(e.target.value, 10))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                >
                  {Array.from({ length: 17 }, (_, i) => i + 1).map((num) => (
                    <option key={num} value={num}>
                      SDG {num}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs text-slate-300 block mb-1">
                  Custom Crisis Context (Optional):
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. Acid rain storm over Sector 4 hydroponics..."
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-500"
                  />
                  <button
                    disabled={isGenerating}
                    onClick={handleGenerate}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 shrink-0"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
                    {isGenerating ? 'Generating...' : 'Generate Turn'}
                  </button>
                </div>
              </div>
            </div>

            {errorMessage && (
              <div className="text-xs text-rose-400 bg-rose-950/40 p-2 rounded-lg border border-rose-800">
                {errorMessage}
              </div>
            )}
          </div>

          {/* View Mode Toggle & Copy Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('json')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer border ${
                  viewMode === 'json'
                    ? 'bg-indigo-950 text-indigo-300 border-indigo-500'
                    : 'bg-slate-950 text-slate-400 border-slate-800'
                }`}
              >
                JSON Payload (Turn Output)
              </button>
              <button
                onClick={() => setViewMode('swift')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer border ${
                  viewMode === 'swift'
                    ? 'bg-indigo-950 text-indigo-300 border-indigo-500'
                    : 'bg-slate-950 text-slate-400 border-slate-800'
                }`}
              >
                Swift Codable Structs
              </button>
            </div>

            <div className="flex items-center gap-2">
              {generatedScenario && (
                <button
                  onClick={() => {
                    sound.playSuccess();
                    onPlayScenario(generatedScenario);
                    onClose();
                  }}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-white" /> Play This Turn
                </button>
              )}

              {viewMode === 'json' ? (
                <button
                  onClick={handleCopyJSON}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-medium flex items-center gap-1 cursor-pointer transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied JSON!' : 'Copy JSON'}
                </button>
              ) : (
                <button
                  onClick={handleCopySwift}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-medium flex items-center gap-1 cursor-pointer transition-colors"
                >
                  {copiedSwift ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedSwift ? 'Copied Swift!' : 'Copy Swift'}
                </button>
              )}
            </div>
          </div>

          {/* Code Viewer */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto max-h-[350px]">
            <pre className="leading-relaxed">
              {viewMode === 'json' ? jsonString : swiftStructCode}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-950/90 border-t border-slate-800 p-4 text-xs text-slate-400 text-center">
          Guaranteed 100% schema compatibility with SwiftUI <code>JSONDecoder().decode(TurnScenario.self, from: data)</code>.
        </div>
      </div>
    </div>
  );
};
