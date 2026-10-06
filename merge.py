import os

with open('cleaned_App_orig.tsx', 'r', encoding='utf-8') as f:
    orig_app = f.read()

with open(r'src\App.tsx', 'r', encoding='utf-8') as f:
    recv_app = f.read()

with open('cleaned_index_orig.css', 'r', encoding='utf-8') as f:
    orig_css = f.read()

with open(r'src\index.css', 'r', encoding='utf-8') as f:
    recv_css = f.read()

# 1. Combine CSS
with open(r'src\index.css', 'w', encoding='utf-8') as f:
    f.write(orig_css + '\n/* ==== RECEIVER PROFILE CSS ==== */\n' + recv_css)

# 2. Combine App.tsx
try:
    recv_components = recv_app.split('function FoodRadar(')[0] + 'function FoodRadar(' + recv_app.split('function FoodRadar(')[1].split('export default function App() {')[0]
except:
    recv_components = recv_app

recv_components = recv_components.replace('function FoodRadar', 'function ReceiverRadar')
recv_components = recv_components.replace('function DonationDetail', 'function ReceiverDetail')
recv_components = recv_components.replace('function ActivePickup', 'function ReceiverPickup')
recv_components = recv_components.replace('function ImpactDashboard', 'function ReceiverImpact')
recv_components = recv_components.replace('<StatusBar />', '<!-- StatusBar removed here to avoid duplication -->')

app_replacement = """
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
    window.addEventListener("ecofood:notify", handleNotify);
    window.addEventListener("app:notify", handleNotify);
    return () => {
      window.removeEventListener("ecofood:notify", handleNotify);
      window.removeEventListener("app:notify", handleNotify);
      window.clearTimeout(timer);
    };
  }, []);

  const show = [
    <Onboarding next={() => setScreen(1)} />,
    <Auth next={() => setScreen(2)} back={() => setScreen(0)} />,
    <Dashboard create={() => setScreen(3)} radar={() => setScreen(4)} />,
    <Donation done={() => setScreen(2)} back={() => setScreen(2)} />,
    <ReceiverRadar onSelect={() => setScreen(5)} />,
    <ReceiverDetail onClaim={() => setScreen(6)} onBack={() => setScreen(4)} />,
    <ReceiverPickup onComplete={() => setScreen(7)} />,
    <ReceiverImpact />
  ][screen];

  const labels = ["Inicio", "Acceso", "Donante", "Donar", "Radar (Receptor)", "Detalle (Receptor)", "Entrega (Receptor)", "Impacto (Receptor)"];

  return (
    <div className="prototype-shell">
      <aside className="prototype-info">
        <AppLogo />
        <div className="prototype-copy"><p>PROTOTIPO MÓVIL</p><h1>Rescatar alimentos<br />nunca fue tan <span>fácil.</span></h1><p>Explora el flujo completo de EcoFood, conectando comercios con comedores de su comunidad.</p></div>
        <nav className="screen-nav">
          {labels.map((label, index) => <button key={label} className={screen === index ? "active" : ""} onClick={() => setScreen(index)}><span>{String(index + 1).padStart(2, "0")}</span>{label}<i /></button>)}
        </nav>
        <p className="photo-credit">Fotografía de Marisol Benitez, Randy Fath, Alexandr Podvalny y Peter Wendt · Unsplash</p>
      </aside>
      <div className="phone-stage">
        <div className="ambient blob-one" /><div className="ambient blob-two" />
        <div className="phone-frame"><div className="dynamic-island" />{show}<div className={`app-toast ${toast ? "visible" : ""}`} role="status"><Icon name="check" size={16} /><span>{toast}</span></div><div className="home-indicator" /></div>
        <div className="screen-caption"><strong>{String(screen + 1).padStart(2, "0")}</strong><span>{labels[screen]}</span><div>{labels.map((_, i) => <i key={i} className={screen === i ? "active" : ""} />)}</div></div>
      </div>
    </div>
  );
}
"""

orig_app_main = orig_app.split('export default function App()')[0]
combined_app = orig_app_main + recv_components + app_replacement

with open(r'src\App.tsx', 'w', encoding='utf-8') as f:
    f.write(combined_app)
