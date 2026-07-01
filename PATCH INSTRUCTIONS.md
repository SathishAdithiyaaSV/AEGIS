# Dashboard Live Patch Instructions

Since the application is already hosted, you don't need to re-upload the entire project. You only need to patch **one file**: `src/App.jsx`. 

Here are the exact two code replacements to make in `App.jsx`.

---

## 1. Add the Interactive Track A Button
Find the `Track A: Taxonomic Filter` panel code (around line 520). 

Look for this exact block of code:
```jsx
                        </div>
                    ))}
                </div>
            </div>
        </div>
```

**Replace it entirely with this:**
```jsx
                        </div>
                    ))}
                </div>
                
                {/* NEW: Interactive Explanation and Button */}
                <div style={{marginTop: '16px', padding: '12px', background: 'rgba(56,189,248,0.1)', border: '1px dashed #38bdf8', borderRadius: '4px'}}>
                    <div style={{color: '#38bdf8', fontSize: '11px', marginBottom: '8px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <div style={{width: '8px', height: '8px', background: '#38bdf8', borderRadius: '50%', animation: 'pulse 2s infinite'}}></div>
                        INTERACTIVE FILTER ANALYSIS
                    </div>
                    <p style={{color: '#94a3b8', fontSize: '11px', lineHeight: '1.4', margin: '0 0 12px 0'}}>
                        The taxonomic filter has isolated a 5% highly dangerous synthetic fraction from the benign background. <strong>Direct your attention to the Actionable Intelligence report below to review the resulting biological protocols.</strong>
                    </p>
                    <button 
                      onClick={() => setActiveOverlay('layman_report')}
                      style={{
                        padding: '12px', width: '100%',
                        background: 'linear-gradient(90deg, #ef4444 0%, #dc2626 100%)',
                        color: '#fff', border: '1px solid #fca5a5', borderRadius: '6px',
                        fontSize: '12px', fontWeight: 'bold', cursor: 'pointer',
                        textShadow: '0 0 5px rgba(255,255,255,0.8)',
                        boxShadow: '0 0 15px rgba(239,68,68,0.6)',
                        display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px',
                        transition: 'all 0.2s', fontFamily: 'monospace'
                      }}
                      onMouseOver={(e) => { e.currentTarget.style.boxShadow = '0 0 25px rgba(239,68,68,0.9)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                      onMouseOut={(e) => { e.currentTarget.style.boxShadow = '0 0 15px rgba(239,68,68,0.6)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                    >
                      <FileText size={16} /> ACTIONABLE INTELLIGENCE
                    </button>
                </div>
            </div>
        </div>
```

---

## 2. Upgrade the Global Footer & Fix the Modal
Find the `Bottom Section: Actionable Intelligence` footer at the very bottom of the file.

Look for the existing `<footer> ... </footer>` block (around line 608 to the end of the file).

**Delete the existing `<footer>` block and replace it with this upgraded gold version (which also extracts the modal out of the footer to prevent the blur-filter CSS trap):**

```jsx
      {/* Center-Screen Massive Modal Layout (Moved OUT of footer to avoid backdrop-filter bug) */}
      {isBriefOpen && (
          <div style={{position: 'fixed', top: '10vh', bottom: '10vh', left: '10vw', right: '10vw', border: '2px solid #fbbf24', padding: '40px', display: 'flex', flexDirection: 'column', background: 'rgba(15,23,42,0.98)', zIndex: 200, boxShadow: '0 0 50px rgba(251,191,36,0.3)', borderRadius: '12px'}}>
              
              <div style={{display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #fbbf24', paddingBottom: '16px', marginBottom: '32px'}}>
                  <h2 style={{color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '24px', margin: 0, textShadow: '0 0 10px rgba(251,191,36,0.5)'}}>
                      <ShieldAlert size={32}/> GLOBAL ACTIONABLE INTELLIGENCE: OFFICIALS ADVISORY
                  </h2>
                  <button onClick={() => setIsBriefOpen(false)} style={{background: 'none', border: 'none', color: '#fbbf24', cursor: 'pointer', transition: 'transform 0.2s'}} onMouseOver={(e)=>e.currentTarget.style.transform='scale(1.2)'} onMouseOut={(e)=>e.currentTarget.style.transform='scale(1)'}><X size={32}/></button>
              </div>

              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1.5fr', gap: '32px', flex: 1, overflowY: 'auto'}}>
                  
                  {/* Col 1: Threat Assessment */}
                  <div style={{background: 'rgba(251,191,36,0.05)', borderLeft: '4px solid #fbbf24', padding: '24px', borderRadius: '4px'}}>
                      <h3 style={{color: '#fbbf24', marginTop: 0, fontSize: '16px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px'}}><AlertTriangle size={20}/> THE EXISTING PROBLEM</h3>
                      <p style={{color: '#e2e8f0', fontSize: '14px', lineHeight: '1.8', margin: 0}}>
                          Bioshield sensors have detected a highly engineered biological weapon matching the <strong>{scenario.name}</strong> profile. 
                          <br/><br/>
                          Unlike natural seasonal viruses, this pathogen is mathematically verified (0.0000001% chance of natural evolution) to be artificially designed to spread rapidly and evade standard medical treatments. 
                          It is actively spreading from {scenario.nodes.map(n => n.name).join(', ')}.
                      </p>
                  </div>

                  {/* Col 2: Contextualizing the Data */}
                  <div style={{background: 'rgba(56,189,248,0.05)', borderLeft: '4px solid #38bdf8', padding: '24px', borderRadius: '4px'}}>
                      <h3 style={{color: '#38bdf8', marginTop: 0, fontSize: '16px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px'}}><CheckCircle2 size={20}/> BENIGN VS. CRITICAL</h3>
                      <p style={{color: '#94a3b8', fontSize: '14px', lineHeight: '1.6', margin: '0 0 16px 0'}}>To prevent panic, officials must clarify that the system safely ignored normal environmental bacteria:</p>
                      <ul style={{color: '#10b981', fontSize: '14px', paddingLeft: '20px', margin: '0 0 16px 0', lineHeight: '1.6'}}>
                          <li><strong>E. coli:</strong> Normal, safe gut bacteria.</li>
                          <li><strong>B. subtilis:</strong> Harmless soil bacteria.</li>
                      </ul>
                      <p style={{color: '#94a3b8', fontSize: '14px', lineHeight: '1.6', margin: 0}}>The immediate danger lies entirely within the isolated 5% synthetic fraction containing <strong>{scenario.nodes[0].vector}</strong>.</p>
                  </div>

                  {/* Col 3: Layman Directives */}
                  <div style={{background: 'linear-gradient(135deg, rgba(251,191,36,0.1) 0%, rgba(0,0,0,0) 100%)', border: '1px solid rgba(251,191,36,0.5)', padding: '24px', borderRadius: '4px', boxShadow: 'inset 0 0 30px rgba(251,191,36,0.05)'}}>
                      <h3 style={{color: '#fbbf24', marginTop: 0, fontSize: '18px', marginBottom: '20px', letterSpacing: '1px'}}>IMMEDIATE OFFICIALS DIRECTIVES</h3>
                      <ol style={{color: '#f8fafc', fontSize: '15px', paddingLeft: '24px', lineHeight: '2.0', margin: 0, fontWeight: 'bold'}}>
                          <li style={{marginBottom: '12px'}}>Initiate immediate physical lockdown of {scenario.nodes[0].facility} to neutralize the primary distribution source.</li>
                          <li style={{marginBottom: '12px'}}>Broadcast public advisory for civilians in {scenario.nodes[0].name} to shelter in place and await military-grade UV-C disinfection.</li>
                          <li>Alert regional medical command to prepare stockpiles for inbound AI-generated mRNA countermeasures within 4-6 hours.</li>
                      </ol>
                  </div>
              </div>
          </div>
      )}

      {/* Bottom Section: Actionable Intelligence (Bright Gold Footer) */}
      <footer style={{position: 'fixed', bottom: '16px', left: '16px', right: '16px', zIndex: 100}}>
        <div className="panel" style={{padding: 0, border: isBriefOpen ? '1px solid #fbbf24' : '1px solid rgba(251,191,36,0.5)', transition: 'all 0.3s', boxShadow: isBriefOpen ? '0 0 30px rgba(251,191,36,0.3)' : '0 0 10px rgba(251,191,36,0.1)', background: 'rgba(4,6,11,0.95)', backdropFilter: 'blur(10px)'}}>
            <div 
                style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', background: isBriefOpen ? 'rgba(251,191,36,0.2)' : 'linear-gradient(90deg, rgba(251,191,36,0.1) 0%, transparent 100%)', padding: '16px', transition: 'all 0.3s'}} 
                onClick={() => setIsBriefOpen(!isBriefOpen)}
            >
                <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                    <ShieldAlert size={24} color={isBriefOpen ? '#fbbf24' : '#f59e0b'} />
                    <h2 style={{fontSize: '18px', margin: 0, color: isBriefOpen ? '#fff' : '#fbbf24', textShadow: isBriefOpen ? '0 0 15px rgba(251,191,36,0.9)' : '0 0 5px rgba(251,191,36,0.4)', letterSpacing: '1px'}}>
                        GLOBAL ACTIONABLE INTELLIGENCE: PUBLIC HEALTH DIRECTIVES
                    </h2>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                    <span style={{color: '#fbbf24', fontSize: '12px', fontFamily: 'monospace', fontWeight: 'bold'}}>{isBriefOpen ? 'MINIMIZE' : 'CLICK TO EXPAND PROTOCOLS'}</span>
                    <div style={{color: '#fbbf24', transform: isBriefOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s'}}>▼</div>
                </div>
            </div>
        </div>
      </footer>
```

### Next Steps for your Developer:
Once they paste those two sections into `App.jsx`, they just need to run `npm run build` on the server and everything will be perfectly synced!
