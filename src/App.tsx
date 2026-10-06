import { useState, useEffect } from "react";

type IconName = "check" | "chevron" | "camera" | "clock" | "map" | "alert" | "sos" | "star" | "share" | "award" | "user" | "shield" | "heart";

function notify(msg: string) {
  window.dispatchEvent(new CustomEvent("app:notify", { detail: msg }));
}

function Icon({ name, size = 24 }: { name: IconName; size?: number }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const paths: Record<IconName, React.ReactNode> = {
    check: <polyline points="20 6 9 17 4 12" />,
    chevron: <polyline points="9 18 15 12 9 6" />,
    camera: <><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></>,
    clock: <><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>,
    map: <><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" /><line x1="9" y1="3" x2="9" y2="18" /><line x1="15" y1="6" x2="15" y2="21" /></>,
    alert: <><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></>,
    sos: <><circle cx="12" cy="12" r="10" /><text x="12" y="16" fontSize="10" fontWeight="bold" textAnchor="middle" fill="currentColor" strokeWidth="0">SOS</text></>,
    star: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />,
    share: <><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></>,
    award: <><circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" /></>,
    user: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></>,
    heart: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  };
  return <svg {...common}>{paths[name]}</svg>;
}

function StatusBar() {
  return (
    <div className="status-bar">
      <span>9:41</span>
      <div className="status-icons"><span>•••</span><span>⌁</span><span className="battery" /></div>
    </div>
  );
}

// 1. KYC Onboarding
function KycOnboarding({ next }: { next: () => void }) {
  const [role, setRole] = useState<"donor" | "receiver" | null>(null);
  const [step, setStep] = useState<1 | 2>(1);

  if (step === 2) {
    return (
      <div className="screen" style={{ background: 'var(--bg)' }}>
        <StatusBar />
        <div className="header" style={{ paddingTop: '24px', paddingBottom: '16px' }}>
          <button style={{ background: 'none', border: 'none', padding: 0, marginBottom: '16px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', cursor: 'pointer', fontWeight: 600, fontSize: '15px' }} onClick={() => setStep(1)}>
            <Icon name="chevron" size={24} style={{ transform: 'rotate(90deg)' }} /> Volver
          </button>
          <h1 style={{ fontSize: '24px', margin: 0 }}>Registro Seguro</h1>
          <p style={{ fontSize: '15px', marginTop: '4px', color: 'var(--text-muted)' }}>
            {role === 'donor' ? 'Verifica tu negocio para donar.' : 'Verifica tu comedor comunitario.'}
          </p>
        </div>
        
        <div style={{ padding: '0 24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '24px', overflowY: 'auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-main)' }}>
              {role === 'donor' ? 'Número de DNI o RUC' : 'Número de DNI'}
            </label>
            <input 
              type="text" 
              placeholder={role === 'donor' ? 'Ingresa tu DNI o RUC' : 'Ingresa tu DNI'} 
              style={{ padding: '16px', borderRadius: '12px', border: '1px solid var(--border)', fontSize: '16px', outline: 'none', width: '100%', boxSizing: 'border-box' }} 
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-main)' }}>
              {role === 'donor' ? 'Foto de la fachada de tu bodega' : 'Documento de Validación'}
            </label>
            {role === 'receiver' && (
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
                Sube una foto de tu resolución municipal, constancia PCA o recibo de luz.
              </p>
            )}
            <div 
              className="kyc-upload" 
              onClick={() => notify("Abriendo cámara...")}
              style={{ border: '2px dashed var(--primary)', borderRadius: '16px', padding: '32px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', background: '#ecfdf5', cursor: 'pointer', marginTop: '8px', transition: '0.2s' }}
            >
              <div style={{ width: 48, height: 48, background: 'white', borderRadius: '50%', display: 'grid', placeItems: 'center', color: 'var(--primary)', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                <Icon name="camera" size={24} />
              </div>
              <div style={{ textAlign: 'center' }}>
                <strong style={{ color: 'var(--text-main)', display: 'block', fontSize: '16px', marginBottom: '4px' }}>Subir Foto</strong>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Toca para escanear documento o fachada</span>
              </div>
            </div>
          </div>

          <div className="alert-banner warning" style={{ marginTop: 'auto', marginBottom: '24px' }}>
            <Icon name="shield" size={24} />
            <div><strong>Verificación Manual</strong><br/>Revisaremos tus datos para establecer una red segura.</div>
          </div>
        </div>
        
        <div style={{ padding: '24px', background: 'white', borderTop: '1px solid var(--border)' }}>
          <button className="btn-primary" onClick={next}>Enviar Solicitud</button>
        </div>
      </div>
    );
  }

  return (
    <div className="screen" style={{ background: 'var(--bg)' }}>
      <StatusBar />
      
      <div className="header" style={{ paddingTop: '40px', paddingBottom: '32px' }}>
        <h1 style={{ fontSize: '32px' }}>Bienvenido a<br/><span style={{ color: 'var(--primary)' }}>EcoFood</span></h1>
        <p style={{ fontSize: '18px' }}>Únete a la red comunitaria.</p>
      </div>
      
      <div style={{ padding: '0 24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <button 
          className="card" 
          style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px', border: role === 'donor' ? '2px solid var(--primary)' : '1px solid var(--border)', background: role === 'donor' ? '#ecfdf5' : 'white', transition: '0.2s', textAlign: 'left', cursor: 'pointer' }}
          onClick={() => { setRole('donor'); setStep(2); }}
        >
          <div style={{ width: '56px', height: '56px', background: role === 'donor' ? 'var(--primary)' : '#f1f5f9', color: role === 'donor' ? 'white' : 'var(--text-muted)', borderRadius: '16px', display: 'grid', placeItems: 'center' }}>
            <Icon name="map" size={28} />
          </div>
          <div>
            <strong style={{ display: 'block', fontSize: '20px', color: 'var(--text-main)', marginBottom: '4px' }}>Quiero Donar</strong>
            <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Bodegas y panaderías</span>
          </div>
        </button>

        <button 
          className="card" 
          style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px', border: role === 'receiver' ? '2px solid var(--primary)' : '1px solid var(--border)', background: role === 'receiver' ? '#ecfdf5' : 'white', transition: '0.2s', textAlign: 'left', cursor: 'pointer' }}
          onClick={() => { setRole('receiver'); setStep(2); }}
        >
          <div style={{ width: '56px', height: '56px', background: role === 'receiver' ? 'var(--primary)' : '#f1f5f9', color: role === 'receiver' ? 'white' : 'var(--text-muted)', borderRadius: '16px', display: 'grid', placeItems: 'center' }}>
            <Icon name="heart" size={28} />
          </div>
          <div>
            <strong style={{ display: 'block', fontSize: '20px', color: 'var(--text-main)', marginBottom: '4px' }}>Necesito Alimentos</strong>
            <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Comedores comunitarios</span>
          </div>
        </button>
      </div>
    </div>
  );
}

// 2. Donor Publish
function DonorPublish({ next, back }: { next: () => void, back?: () => void }) {
  const [step, setStep] = useState<1 | 2>(1);
  const [category, setCategory] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<string>("1 Bolsa");
  const [publishing, setPublishing] = useState(false);
  
  if (step === 1) {
    return (
      <div className="screen" style={{ background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
        <StatusBar />
        <div className="header" style={{ paddingTop: '24px', paddingBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          {back && (
            <button style={{ background: 'none', border: 'none', padding: 0, color: 'var(--text-main)', cursor: 'pointer', display: 'flex' }} onClick={back}>
              <Icon name="chevron" size={28} style={{ transform: 'rotate(90deg)' }} />
            </button>
          )}
          <div>
            <h1 style={{ fontSize: '28px', color: 'var(--text-main)', margin: 0 }}>Hola, <span style={{ color: 'var(--primary)' }}>Bodega El Sol</span></h1>
            <p style={{ fontSize: '15px', color: 'var(--text-muted)', marginTop: '4px', marginBottom: 0 }}>Tienes 0 entregas pendientes hoy.</p>
          </div>
        </div>
        
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '24px' }}>
          <button 
            onClick={() => setStep(2)}
            style={{ width: '220px', height: '220px', borderRadius: '110px', background: 'var(--primary)', border: 'none', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', cursor: 'pointer', boxShadow: '0 16px 32px rgba(16,185,129,0.3)', transition: 'transform 0.2s' }}
            onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
            onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            <strong style={{ fontSize: '26px', letterSpacing: '-0.5px' }}>Donar hoy</strong>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="screen" style={{ background: 'var(--bg)' }}>
      <StatusBar />
      <div className="header" style={{ paddingTop: '16px', paddingBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button style={{ background: 'none', border: 'none', padding: 0, color: 'var(--text-main)', cursor: 'pointer', display: 'flex' }} onClick={() => setStep(1)}>
          <Icon name="chevron" size={28} style={{ transform: 'rotate(90deg)' }} />
        </button>
        <h1 style={{ fontSize: '22px', color: 'var(--text-main)', margin: 0 }}>Nueva Donación</h1>
      </div>
      
      <div style={{ padding: '0 24px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '24px', paddingBottom: '24px' }}>
        
        {/* Category */}
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 12px' }}>¿Qué tipo de alimento es?</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
            {[
              { id: 'pan', icon: '🍞', label: 'Panadería' },
              { id: 'fruta', icon: '🍎', label: 'Frutas/Verduras' },
              { id: 'abarrotes', icon: '🥫', label: 'Abarrotes' }
            ].map((cat) => (
              <button
                key={cat.id}
                style={{
                  padding: '16px 8px', border: category === cat.id ? '2px solid var(--primary)' : '1px solid var(--border)', borderRadius: '16px',
                  background: category === cat.id ? '#ecfdf5' : 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer', transition: '0.2s'
                }}
                onClick={() => setCategory(cat.id)}
              >
                <span style={{ fontSize: '32px' }}>{cat.icon}</span>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-main)', textAlign: 'center', lineHeight: 1.2 }}>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Photo and Quantity */}
        <div style={{ display: 'flex', gap: '16px' }}>
          <div 
            onClick={() => notify("Abriendo cámara...")}
            style={{ flex: 1, border: '2px dashed var(--border)', borderRadius: '16px', background: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '16px', cursor: 'pointer' }}
          >
            <div style={{ width: 40, height: 40, background: '#f1f5f9', borderRadius: '50%', display: 'grid', placeItems: 'center', color: 'var(--text-muted)' }}>
              <Icon name="camera" size={20} />
            </div>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', textAlign: 'center' }}>Tomar Foto<br/>(Opcional)</span>
          </div>
          
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, margin: 0 }}>Cantidad Aprox.</h3>
            {["1 Bolsa", "Aprox 3 kg"].map(q => (
              <button
                key={q}
                onClick={() => setQuantity(q)}
                style={{ flex: 1, border: quantity === q ? '2px solid var(--primary)' : '1px solid var(--border)', borderRadius: '12px', background: quantity === q ? '#ecfdf5' : 'white', fontWeight: 600, fontSize: '14px', cursor: 'pointer', color: quantity === q ? 'var(--primary)' : 'var(--text-main)' }}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
        
        {/* Time Limit */}
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 12px' }}>Horario Límite de Recojo</h3>
          <div style={{ position: 'relative' }}>
            <select style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid var(--border)', appearance: 'none', background: 'white', fontSize: '16px', fontWeight: 600, outline: 'none', cursor: 'pointer' }}>
              <option>Hasta las 8:00 PM</option>
              <option>Hasta las 9:00 PM</option>
              <option>Hasta las 10:00 PM</option>
            </select>
            <div style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-muted)' }}>
              <Icon name="clock" size={20} />
            </div>
          </div>
        </div>
        
      </div>
      
      <div style={{ padding: '24px', background: 'white', borderTop: '1px solid var(--border)' }}>
        <button 
          className="btn-primary" 
          disabled={!category || publishing}
          style={{ opacity: !category ? 0.5 : 1, transition: 'all 0.2s', width: '100%' }}
          onClick={() => {
            setPublishing(true);
            notify("Estado: Disponible. Generando QR...");
            setTimeout(next, 1800);
          }}
        >
          {publishing ? "Publicando..." : "Publicar donación"}
        </button>
      </div>
    </div>
  );
}

// 3. Receiver Modal
function ReceiverModal({ next, back }: { next: () => void, back?: () => void }) {
  const [step, setStep] = useState<"alert" | "details">("alert");

  if (step === "alert") {
    return (
      <div className="screen" style={{ background: 'url(https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80) center/cover' }}>
        <StatusBar />
        {back && (
          <button style={{ position: 'absolute', top: '48px', left: '16px', background: 'rgba(255,255,255,0.8)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'grid', placeItems: 'center', cursor: 'pointer', backdropFilter: 'blur(4px)', zIndex: 50 }} onClick={back}>
            <Icon name="chevron" size={24} style={{ transform: 'rotate(90deg)' }} />
          </button>
        )}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }} />
        
        {/* Simulated Lock Screen Clock */}
        <div style={{ position: 'absolute', top: '15%', left: '0', right: '0', textAlign: 'center', color: 'white' }}>
          <h1 style={{ fontSize: '64px', fontWeight: 300, margin: 0, textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>09:41</h1>
          <p style={{ fontSize: '18px', margin: '8px 0 0', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>Sábado, 14 de Octubre</p>
        </div>

        {/* Push Notification */}
        <div 
          onClick={() => setStep("details")}
          style={{ position: 'absolute', top: '35%', left: '16px', right: '16px', background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)', borderRadius: '20px', padding: '16px', cursor: 'pointer', boxShadow: '0 8px 32px rgba(0,0,0,0.15)', transform: 'translateY(0)', transition: '0.2s' }}
          onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
          onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <div style={{ width: 24, height: 24, background: 'var(--primary)', borderRadius: '6px', display: 'grid', placeItems: 'center', color: 'white' }}><Icon name="heart" size={14} /></div>
            <strong style={{ fontSize: '13px', color: '#333' }}>EcoFood • Alerta Cercana</strong>
            <span style={{ fontSize: '13px', color: '#666', marginLeft: 'auto' }}>ahora</span>
          </div>
          <h4 style={{ margin: '0 0 4px', fontSize: '15px', color: 'var(--text-main)' }}>¡Donación Disponible!</h4>
          <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.4 }}>
            🍞 Pan y 🍎 frutas disponibles a 4 cuadras en <strong>Bodega Don Pepe</strong>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="screen" style={{ background: 'var(--bg)' }}>
      <StatusBar />
      
      {/* Header Photo */}
      <div style={{ position: 'relative', height: '240px', background: 'url(https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80) center/cover' }}>
        <button style={{ position: 'absolute', top: '48px', left: '16px', background: 'rgba(255,255,255,0.8)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'grid', placeItems: 'center', cursor: 'pointer', backdropFilter: 'blur(4px)' }} onClick={() => setStep("alert")}>
          <Icon name="chevron" size={24} style={{ transform: 'rotate(90deg)' }} />
        </button>
        <div style={{ position: 'absolute', bottom: '16px', left: '16px', background: 'var(--alert)', color: 'white', padding: '6px 12px', borderRadius: '8px', fontSize: '13px', fontWeight: 800 }}>
          Por Vencer (Hoy)
        </div>
      </div>

      <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
        <div>
          <h1 style={{ fontSize: '24px', margin: '0 0 8px' }}>Mix de Panadería y Frutas</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
            <Icon name="user" size={18} />
            <span style={{ fontSize: '15px' }}>Bodega Don Pepe</span>
          </div>
        </div>

        {/* Quick Info Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Icon name="map" size={24} style={{ color: 'var(--primary)' }} />
            <div>
              <strong style={{ display: 'block', fontSize: '16px' }}>400m</strong>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Aprox. 4 cuadras</span>
            </div>
          </div>
          <div style={{ background: '#FEF2F2', padding: '16px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Icon name="clock" size={24} style={{ color: 'var(--alert)' }} />
            <div>
              <strong style={{ display: 'block', fontSize: '16px' }}>9:00 PM</strong>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Hora límite</span>
            </div>
          </div>
        </div>

        <div style={{ background: '#f1f5f9', padding: '16px', borderRadius: '16px' }}>
          <strong style={{ display: 'block', fontSize: '14px', marginBottom: '4px' }}>Contenido estimado:</strong>
          <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-muted)' }}>1 bolsa grande con panes surtidos y aprox 2 kilos de fruta variada para rescatar.</p>
        </div>
        
      </div>
      
      <div style={{ padding: '24px', background: 'white', borderTop: '1px solid var(--border)' }}>
        <button 
          className="btn-primary" 
          style={{ width: '100%', fontSize: '16px' }}
          onClick={() => {
            notify("Reserva exitosa. Publicación oculta para otros.");
            setTimeout(next, 2000);
          }}
        >
          Reservar para mi comedor
        </button>
      </div>
    </div>
  );
}

// 4. Secure Handover
function Handover({ next, back }: { next: () => void, back?: () => void }) {
  const [step, setStep] = useState<"qr" | "success">("qr");

  if (step === "success") {
    return (
      <div className="screen" style={{ background: 'var(--primary)', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center' }}>
        <StatusBar />
        <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'grid', placeItems: 'center', marginBottom: '32px', animation: 'scaleUp 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'white', color: 'var(--primary)', display: 'grid', placeItems: 'center' }}>
            <Icon name="check" size={48} />
          </div>
        </div>
        
        <h1 style={{ fontSize: '32px', margin: '0 0 16px', lineHeight: 1.2 }}>Entrega<br/>Exitosa</h1>
        <p style={{ fontSize: '18px', margin: '0 0 32px', opacity: 0.9 }}>
          Alimentos entregados al<br/><strong>Comedor Santa Rosa</strong>
        </p>

        <div style={{ background: 'rgba(255,255,255,0.1)', padding: '16px', borderRadius: '16px', width: '100%', marginBottom: '48px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ opacity: 0.8 }}>Estado</span>
            <strong>Entregado ✅</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ opacity: 0.8 }}>Hora</span>
            <strong>{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</strong>
          </div>
        </div>

        <button 
          onClick={next}
          style={{ width: '100%', padding: '16px', background: 'white', color: 'var(--primary)', border: 'none', borderRadius: '16px', fontSize: '18px', fontWeight: 700, cursor: 'pointer', marginTop: 'auto' }}
        >
          Continuar
        </button>
        <style>{`@keyframes scaleUp { 0% { transform: scale(0); } 100% { transform: scale(1); } }`}</style>
      </div>
    );
  }

  return (
    <div className="screen" style={{ background: 'var(--bg)' }}>
      <StatusBar />
      <button className="sos-btn" onClick={() => notify("Soporte de Emergencia Activado")}>
        <Icon name="sos" size={24} />
      </button>
      
      <div className="header" style={{ paddingRight: '80px', paddingBottom: '16px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
        {back && (
          <button style={{ background: 'none', border: 'none', padding: 0, color: 'var(--text-main)', cursor: 'pointer', marginTop: '4px', display: 'flex' }} onClick={back}>
            <Icon name="chevron" size={28} style={{ transform: 'rotate(90deg)' }} />
          </button>
        )}
        <div>
          <h1 style={{ margin: 0 }}>Entrega en Progreso</h1>
          <p style={{ margin: 0 }}>Mostrando QR a Bodega Don Pepe</p>
        </div>
      </div>
      
      <div style={{ padding: '0 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, overflowY: 'auto' }}>
        
        {/* Status Tracker (Vertical Stepper) */}
        <div style={{ width: '100%', background: 'white', padding: '20px', borderRadius: '20px', border: '1px solid var(--border)', marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'grid', placeItems: 'center' }}><Icon name="check" size={14} /></div>
            <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-main)' }}>Donado</span>
          </div>
          <div style={{ width: 2, height: 16, background: 'var(--primary)', marginLeft: 11 }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'grid', placeItems: 'center' }}><Icon name="check" size={14} /></div>
            <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-main)' }}>Reservado</span>
          </div>
          <div style={{ width: 2, height: 16, background: '#cbd5e1', marginLeft: 11 }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', border: '2px solid var(--urgency, #F59E0B)', display: 'grid', placeItems: 'center' }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--urgency, #F59E0B)', animation: 'pulse 1.5s infinite' }} />
            </div>
            <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-main)' }}>Esperando Entrega</span>
          </div>
        </div>
        <style>{`@keyframes pulse { 0% { transform: scale(0.8); opacity: 0.5; } 50% { transform: scale(1.2); opacity: 1; } 100% { transform: scale(0.8); opacity: 0.5; } }`}</style>
        
        {/* Massive QR Code Box */}
        <div className="qr-box" style={{ width: '100%', padding: '32px 24px', marginTop: 0 }}>
          <svg width="240" height="240" viewBox="0 0 25 25">
            <rect width="25" height="25" fill="#fff" />
            <rect x="2" y="2" width="6" height="6" fill="#0F172A" />
            <rect x="3" y="3" width="4" height="4" fill="#fff" />
            <rect x="4" y="4" width="2" height="2" fill="#0F172A" />
            <rect x="17" y="2" width="6" height="6" fill="#0F172A" />
            <rect x="18" y="3" width="4" height="4" fill="#fff" />
            <rect x="19" y="4" width="2" height="2" fill="#0F172A" />
            <rect x="2" y="17" width="6" height="6" fill="#0F172A" />
            <rect x="3" y="18" width="4" height="4" fill="#fff" />
            <rect x="4" y="19" width="2" height="2" fill="#0F172A" />
            <rect x="10" y="10" width="5" height="5" fill="#10B981" rx="1" />
            <rect x="9" y="2" width="2" height="2" fill="#0F172A" />
            <rect x="12" y="4" width="2" height="2" fill="#0F172A" />
            <rect x="20" y="14" width="2" height="2" fill="#0F172A" />
            <rect x="11" y="17" width="2" height="2" fill="#0F172A" />
            <rect x="17" y="19" width="2" height="2" fill="#0F172A" />
            <rect x="21" y="21" width="2" height="2" fill="#0F172A" />
          </svg>
          
          <div className="fallback-pin" style={{ marginTop: '32px', background: '#f8fafc', padding: '16px' }}>
            <span style={{ fontSize: '14px', marginBottom: '8px', display: 'block' }}>Si falla la cámara, el dueño puede ingresar este PIN</span>
            <strong style={{ fontSize: '32px', color: 'var(--primary)' }}>PIN: 8492</strong>
          </div>
        </div>
      </div>
      
      <div style={{ marginTop: 'auto', padding: '24px', background: 'white', borderTop: '1px solid var(--border)' }}>
        <button className="btn-primary" onClick={() => {
          notify("Bodeguero escanea el QR...");
          setTimeout(() => setStep("success"), 1000);
        }}>
          Simular Bodeguero Escaneando QR
        </button>
      </div>
    </div>
  );
}

// 5. Dashboard & Gamification
function Dashboard({ back }: { back?: () => void }) {
  const [rated, setRated] = useState(false);
  const [rating, setRating] = useState(0);
  const [view, setView] = useState<"bodeguero" | "comedor">("bodeguero");
  
  if (!rated) {
    return (
      <div className="screen" style={{ background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
        <StatusBar />
        {back && (
          <button style={{ position: 'absolute', top: '48px', left: '16px', background: 'none', border: 'none', padding: 0, color: 'var(--text-main)', cursor: 'pointer', display: 'flex' }} onClick={back}>
            <Icon name="chevron" size={28} style={{ transform: 'rotate(90deg)' }} />
          </button>
        )}
        <div style={{ flex: 1, padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 style={{ fontSize: '28px', textAlign: 'center', margin: '0 0 16px' }}>Califica la entrega</h2>
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '32px' }}>¿Qué te pareció la experiencia?</p>
          
          <div className="rating-stars" style={{ color: '#e2e8f0', display: 'flex', gap: '8px', fontSize: '36px', justifyContent: 'center', marginBottom: '32px' }}>
            {[1,2,3,4,5].map(i => (
              <div key={i} style={{ color: i <= rating ? 'var(--urgency, #F59E0B)' : '#cbd5e1', cursor: 'pointer', transition: '0.2s', transform: i <= rating ? 'scale(1.1)' : 'scale(1)' }} onClick={() => setRating(i)}>
                <Icon name="star" size={48} />
              </div>
            ))}
          </div>
          
          {rating > 0 && (
            <div className="smart-chips" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginBottom: '32px' }}>
              <button style={{ padding: '8px 16px', borderRadius: '20px', border: '1px solid var(--primary)', background: 'var(--primary)', color: 'white', fontWeight: 600 }}>A tiempo</button>
              <button style={{ padding: '8px 16px', borderRadius: '20px', border: '1px solid var(--border)', background: 'white', fontWeight: 600, color: 'var(--text-main)' }}>Amable</button>
              <button style={{ padding: '8px 16px', borderRadius: '20px', border: '1px solid var(--border)', background: 'white', fontWeight: 600, color: 'var(--text-main)' }}>Buen estado</button>
            </div>
          )}
          
          <button 
            className="btn-primary" 
            disabled={rating === 0}
            style={{ opacity: rating === 0 ? 0.5 : 1, marginTop: 'auto', transition: '0.2s', width: '100%' }}
            onClick={() => {
              notify("¡Gracias por tu calificación!");
              setRated(true);
            }}
          >
            Enviar Calificación
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="screen" style={{ background: 'var(--bg)' }}>
      <StatusBar />
      <div className="header" style={{ paddingTop: '16px', paddingBottom: '16px' }}>
        <h1 style={{ fontSize: '24px', color: 'var(--text-main)', margin: '0 0 16px' }}>Transparencia</h1>
        <div style={{ display: 'flex', background: '#e2e8f0', borderRadius: '12px', padding: '4px' }}>
          <button style={{ flex: 1, padding: '10px 0', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 600, background: view === "bodeguero" ? 'white' : 'transparent', color: view === "bodeguero" ? 'var(--text-main)' : 'var(--text-muted)', boxShadow: view === "bodeguero" ? '0 2px 8px rgba(0,0,0,0.05)' : 'none', cursor: 'pointer', transition: '0.2s' }} onClick={() => setView("bodeguero")}>
            Bodeguero
          </button>
          <button style={{ flex: 1, padding: '10px 0', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 600, background: view === "comedor" ? 'white' : 'transparent', color: view === "comedor" ? 'var(--text-main)' : 'var(--text-muted)', boxShadow: view === "comedor" ? '0 2px 8px rgba(0,0,0,0.05)' : 'none', cursor: 'pointer', transition: '0.2s' }} onClick={() => setView("comedor")}>
            Comedor
          </button>
        </div>
      </div>
      
      <div style={{ padding: '0 24px', flex: 1, overflowY: 'auto', paddingBottom: '24px' }}>
        {view === "bodeguero" && (
          <div style={{ animation: 'fadeIn 0.3s' }}>
            <div className="card" style={{ background: 'var(--secondary)', color: 'white', marginBottom: '24px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', right: -20, top: -20, opacity: 0.1, transform: 'scale(3)' }}><Icon name="heart" size={100} /></div>
              <span style={{ fontSize: '13px', opacity: 0.8, fontWeight: 700, letterSpacing: '1px' }}>RESUMEN MENSUAL</span>
              <h2 style={{ fontSize: '24px', fontWeight: 800, margin: '12px 0', lineHeight: 1.2 }}>Este mes evitaste que<br/>20 kilos de comida<br/>se desperdicien.</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.15)', padding: '10px 14px', borderRadius: '12px', display: 'inline-flex', marginTop: '8px' }}>
                <Icon name="heart" size={18} />
                <span style={{ fontWeight: 700, fontSize: '15px' }}>= 40 comidas aseguradas</span>
              </div>
            </div>

            <h3 style={{ fontSize: '18px', margin: '0 0 16px', fontWeight: 700 }}>Tus Logros</h3>
            <div className="badge" style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', border: 'none', color: 'white', boxShadow: '0 12px 24px rgba(16,185,129,0.2)', padding: '16px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div className="badge-icon" style={{ background: 'white', color: '#059669', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: 48, height: 48, borderRadius: '50%', display: 'grid', placeItems: 'center' }}>
                <Icon name="award" size={24} />
              </div>
              <div className="badge-info">
                <strong style={{ color: 'white', fontSize: '18px', display: 'block' }}>Héroe Cero Desperdicios</strong>
                <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '13px' }}>Bodega destacada del barrio</span>
              </div>
            </div>
          </div>
        )}

        {view === "comedor" && (
          <div style={{ animation: 'fadeIn 0.3s' }}>
            <h3 style={{ fontSize: '18px', margin: '0 0 16px', fontWeight: 700 }}>Historial de Donaciones</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '16px', padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <strong style={{ fontSize: '16px' }}>Mix Panadería y Frutas</strong>
                  <span style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '14px' }}>Hoy</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '13px' }}>
                  <Icon name="check" size={16} /> Entregado por Bodega Don Pepe (3kg)
                </div>
              </div>

              <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '16px', padding: '16px', opacity: 0.8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <strong style={{ fontSize: '16px' }}>Caja de Verduras</strong>
                  <span style={{ color: 'var(--text-muted)', fontWeight: 700, fontSize: '14px' }}>Ayer</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '13px' }}>
                  <Icon name="check" size={16} /> Entregado por Supermercado (5kg)
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {view === "bodeguero" && (
        <div style={{ padding: '24px', background: 'white', borderTop: '1px solid var(--border)' }}>
          <button className="btn-primary" style={{ width: '100%', gap: '12px' }} onClick={() => notify("Generando imagen para redes...")}>
            <Icon name="share" size={24} />
            Compartir Impacto
          </button>
        </div>
      )}
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState(0);
  const [toast, setToast] = useState("");

  useEffect(() => {
    let timer = 0;
    const handleNotify = (event: any) => {
      setToast(event.detail);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setToast(""), 2300);
    };
    window.addEventListener("app:notify", handleNotify);
    return () => {
      window.removeEventListener("app:notify", handleNotify);
      window.clearTimeout(timer);
    };
  }, []);

  const show = [
    <KycOnboarding next={() => setScreen(1)} />,
    <DonorPublish back={() => setScreen(0)} next={() => setScreen(2)} />,
    <ReceiverModal back={() => setScreen(1)} next={() => setScreen(3)} />,
    <Handover back={() => setScreen(2)} next={() => setScreen(4)} />,
    <Dashboard back={() => setScreen(3)} />
  ][screen];

  return (
    <div className="prototype-shell">
      <div className="phone-stage">
        <div className="phone-frame">
          <div className="dynamic-island" />
          {show}
          <div className={`toast ${toast ? "visible" : ""}`} style={{ position: 'absolute', bottom: '100px', left: '50%', transform: 'translateX(-50%)', background: '#0f172a', color: 'white', padding: '12px 20px', borderRadius: '12px', opacity: toast ? 1 : 0, transition: '0.3s', pointerEvents: 'none', zIndex: 100, display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, whiteSpace: 'nowrap' }}>
            <Icon name="check" size={20} />
            <span>{toast}</span>
          </div>
          <div className="home-indicator" />
        </div>
      </div>
    </div>
  );
}
