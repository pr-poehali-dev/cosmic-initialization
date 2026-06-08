import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Phone, Mail, ShoppingCart, X, Plus, Minus, Trash2 } from "lucide-react"

// ─── ТИПЫ ───────────────────────────────────────────────────────────────────
interface Product { id: number; name: string; price: number; image: string; category: string }
interface CartItem extends Product { qty: number }

// ─── ДАННЫЕ ─────────────────────────────────────────────────────────────────
const NAV = [
  { name: "Главная", href: "#home" },
  { name: "О нас", href: "#about" },
  { name: "Каталог", href: "#catalog" },
  { name: "Вакансии", href: "#jobs" },
  { name: "Контакты", href: "#contact" },
]

const PRODUCTS: Product[] = [
  { id: 1,  name: "Хлеб пшеничный",        price: 42,  image: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400&h=280&fit=crop&q=90", category: "Хлеб" },
  { id: 2,  name: "Хлеб ржаной",           price: 38,  image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=280&fit=crop&q=90", category: "Хлеб" },
  { id: 3,  name: "Батон нарезной",        price: 35,  image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400&h=280&fit=crop&q=90", category: "Хлеб" },
  { id: 4,  name: "Булочка с маком",       price: 18,  image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=280&fit=crop&q=90", category: "Сдоба" },
  { id: 5,  name: "Рогалик сдобный",       price: 16,  image: "https://images.unsplash.com/photo-1568471173242-461f0a730452?w=400&h=280&fit=crop&q=90", category: "Сдоба" },
  { id: 6,  name: "Слойка с творогом",     price: 24,  image: "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=400&h=280&fit=crop&q=90", category: "Сдоба" },
  { id: 7,  name: "Пирожок с яблоком",     price: 20,  image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=280&fit=crop&q=90", category: "Пирожки" },
  { id: 8,  name: "Пирожок с капустой",    price: 20,  image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=280&fit=crop&q=90", category: "Пирожки" },
  { id: 9,  name: "Печенье домашнее",      price: 120, image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=280&fit=crop&q=90", category: "Печенье" },
  { id: 10, name: "Торт «Прага»",          price: 680, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=280&fit=crop&q=90", category: "Торты" },
  { id: 11, name: "Эклеры",               price: 55,  image: "https://images.unsplash.com/photo-1612203985729-70726954388c?w=400&h=280&fit=crop&q=90", category: "Торты" },
  { id: 12, name: "Круассан",              price: 55,  image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=280&fit=crop&q=90", category: "Сдоба" },
]

const CATS = ["Все", "Хлеб", "Сдоба", "Пирожки", "Печенье", "Торты"]

// ─── ЛОГОТИП-МЕЛЬНИЦА (SVG) ─────────────────────────────────────────────────
function MillLogo({ size = 52 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      {/* Колосья */}
      <ellipse cx="20" cy="68" rx="3" ry="10" fill="#c8a03a" transform="rotate(-20 20 68)" />
      <ellipse cx="60" cy="68" rx="3" ry="10" fill="#c8a03a" transform="rotate(20 60 68)" />
      {/* Основание мельницы */}
      <rect x="28" y="46" width="24" height="26" rx="2" fill="#5a2d0c" />
      {/* Дверь */}
      <rect x="34" y="56" width="12" height="16" rx="6" fill="#3d1a06" />
      {/* Корпус (треугольная крыша) */}
      <polygon points="20,48 40,22 60,48" fill="#7a3d10" />
      {/* Верхушка */}
      <circle cx="40" cy="22" r="5" fill="#5a2d0c" />
      {/* Крылья мельницы */}
      <rect x="38" y="4" width="4" height="20" rx="2" fill="#c8a03a" transform="rotate(0 40 22)" />
      <rect x="38" y="4" width="4" height="20" rx="2" fill="#c8a03a" transform="rotate(45 40 22)" />
      <rect x="38" y="4" width="4" height="20" rx="2" fill="#c8a03a" transform="rotate(90 40 22)" />
      <rect x="38" y="4" width="4" height="20" rx="2" fill="#c8a03a" transform="rotate(135 40 22)" />
      {/* Центр крыльев */}
      <circle cx="40" cy="22" r="3" fill="#3d1a06" />
      {/* Декор — звёздочки/точки */}
      <circle cx="26" cy="36" r="1.5" fill="#c8a03a" />
      <circle cx="54" cy="36" r="1.5" fill="#c8a03a" />
    </svg>
  )
}

// ─── КОРЗИНА ────────────────────────────────────────────────────────────────
function CartPanel({ cart, onClose, onAdd, onRemove, onDelete }: {
  cart: CartItem[]; onClose: () => void
  onAdd: (id: number) => void; onRemove: (id: number) => void; onDelete: (id: number) => void
}) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0)
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <motion.div
        initial={{ x: 380 }} animate={{ x: 0 }} exit={{ x: 380 }}
        transition={{ type: "spring", damping: 28, stiffness: 260 }}
        className="relative w-full max-w-sm flex flex-col shadow-2xl"
        style={{ background: "#fdf6ec" }}
      >
        <div className="flex items-center justify-between px-5 py-4" style={{ background: "linear-gradient(135deg, #3d2108 0%, #5a3010 100%)" }}>
          <span className="font-bold text-lg text-white tracking-wide">Корзина</span>
          <button onClick={onClose} className="text-white/70 hover:text-white"><X className="w-5 h-5" /></button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {cart.length === 0 && (
            <div className="text-center mt-16">
              <div className="text-5xl mb-3">🧺</div>
              <p className="text-sm" style={{ color: "#7a5c3a" }}>Корзина пуста</p>
            </div>
          )}
          {cart.map(item => (
            <div key={item.id} className="flex gap-3 bg-white rounded-xl p-3 shadow-sm">
              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold leading-tight mb-1" style={{ color: "#3d2108" }}>{item.name}</p>
                <p className="text-sm font-bold" style={{ color: "#c0392b" }}>{item.price} ₽</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <button onClick={() => onRemove(item.id)} className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs" style={{ background: "#3d2108" }}>
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-sm font-bold w-4 text-center" style={{ color: "#3d2108" }}>{item.qty}</span>
                  <button onClick={() => onAdd(item.id)} className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs" style={{ background: "#c0392b" }}>
                    <Plus className="w-3 h-3" />
                  </button>
                  <button onClick={() => onDelete(item.id)} className="ml-auto" style={{ color: "#ccc" }}>
                    <Trash2 className="w-4 h-4 hover:text-red-500 transition-colors" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cart.length > 0 && (
          <div className="px-4 py-4 border-t" style={{ borderColor: "#e8d5be" }}>
            <div className="flex justify-between mb-4">
              <span className="font-semibold" style={{ color: "#3d2108" }}>Итого:</span>
              <span className="font-bold text-xl" style={{ color: "#c0392b" }}>{total} ₽</span>
            </div>
            <button className="w-full text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity" style={{ background: "linear-gradient(135deg, #c0392b 0%, #e74c3c 100%)" }}>
              Оформить заказ
            </button>
          </div>
        )}
      </motion.div>
    </div>
  )
}

// ─── МИНИ-ИГРА ──────────────────────────────────────────────────────────────
function BreadGame({ onClose }: { onClose: () => void }) {
  const [basket, setBasket] = React.useState(50)
  const [breads, setBreads] = React.useState<{ id: number; x: number; y: number }[]>([])
  const [score, setScore] = React.useState(0)
  const [lives, setLives] = React.useState(3)
  const [running, setRunning] = React.useState(true)
  const nextId = React.useRef(0)
  const gameRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!running) return
    const iv = setInterval(() => {
      setBreads(b => [...b, { id: nextId.current++, x: Math.random() * 80 + 10, y: 0 }])
    }, 1100)
    return () => clearInterval(iv)
  }, [running])

  React.useEffect(() => {
    if (!running) return
    const iv = setInterval(() => {
      setBreads(prev => {
        const next: typeof prev = []
        let missed = 0
        for (const b of prev) {
          const ny = b.y + 2.8
          if (ny >= 87) {
            if (Math.abs(b.x - basket) < 11) setScore(s => s + 1)
            else missed++
          } else next.push({ ...b, y: ny })
        }
        if (missed > 0) setLives(l => l - missed)
        return next
      })
    }, 40)
    return () => clearInterval(iv)
  }, [running, basket])

  React.useEffect(() => { if (lives <= 0) setRunning(false) }, [lives])

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!gameRef.current) return
    const rect = gameRef.current.getBoundingClientRect()
    const cx = "touches" in e ? e.touches[0].clientX : e.clientX
    setBasket(Math.max(8, Math.min(92, ((cx - rect.left) / rect.width) * 100)))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="rounded-2xl overflow-hidden shadow-2xl w-full max-w-sm" style={{ background: "#fdf6ec" }}>
        <div className="flex items-center justify-between px-5 py-3" style={{ background: "linear-gradient(135deg, #3d2108, #5a3010)" }}>
          <span className="font-bold text-white">🍞 Поймай хлебушек!</span>
          <button onClick={onClose} className="text-white/70 hover:text-white"><X className="w-5 h-5" /></button>
        </div>
        <div className="flex justify-between px-5 py-2 text-sm" style={{ background: "#f0e0c8" }}>
          <span style={{ color: "#3d2108" }}>Счёт: <b style={{ color: "#c0392b" }}>{score}</b></span>
          <span style={{ color: "#3d2108" }}>{"❤️".repeat(Math.max(0, lives))}</span>
        </div>
        <div ref={gameRef} className="relative overflow-hidden select-none cursor-none"
          style={{ height: 300, background: "linear-gradient(180deg, #fff9f0 0%, #faebd0 100%)" }}
          onMouseMove={handleMove} onTouchMove={handleMove}>
          {!running && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3" style={{ background: "rgba(255,255,255,0.88)" }}>
              <p className="text-4xl">🍞</p>
              <p className="text-xl font-bold" style={{ color: "#3d2108" }}>Игра окончена!</p>
              <p className="font-semibold" style={{ color: "#c0392b" }}>Поймано: {score}</p>
              <button onClick={() => { setScore(0); setLives(3); setBreads([]); setRunning(true) }}
                className="text-white font-bold px-6 py-2 rounded-full hover:opacity-90"
                style={{ background: "#c0392b" }}>
                Ещё раз
              </button>
            </div>
          )}
          {breads.map(b => (
            <div key={b.id} className="absolute text-2xl" style={{ left: `${b.x}%`, top: `${b.y}%`, transform: "translate(-50%,-50%)" }}>🍞</div>
          ))}
          <div className="absolute text-3xl transition-none" style={{ left: `${basket}%`, bottom: 8, transform: "translateX(-50%)" }}>🧺</div>
        </div>
        <p className="text-center text-xs py-2" style={{ color: "#7a5c3a" }}>Двигай мышью или пальцем</p>
      </div>
    </div>
  )
}

// ─── ГЛАВНЫЙ КОМПОНЕНТ ───────────────────────────────────────────────────────
export default function SoftwareDevelopmentWebsite() {
  const [cart, setCart] = React.useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = React.useState(false)
  const [gameOpen, setGameOpen] = React.useState(false)
  const [cat, setCat] = React.useState("Все")
  const [scrolled, setScrolled] = React.useState(false)
  const [mob, setMob] = React.useState(false)

  React.useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", fn)
    return () => window.removeEventListener("scroll", fn)
  }, [])

  const addToCart = (p: Product) =>
    setCart(prev => prev.find(i => i.id === p.id)
      ? prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i)
      : [...prev, { ...p, qty: 1 }])
  const addQty = (id: number) => setCart(prev => prev.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i))
  const removeQty = (id: number) => setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty - 1) } : i))
  const del = (id: number) => setCart(prev => prev.filter(i => i.id !== id))
  const totalItems = cart.reduce((s, i) => s + i.qty, 0)
  const filtered = cat === "Все" ? PRODUCTS : PRODUCTS.filter(p => p.category === cat)

  return (
    <div style={{ background: "#f5ede0", color: "#2c1a0e", fontFamily: "Georgia, serif" }}>

      {/* ══ HEADER ═══════════════════════════════════════════════════════════ */}
      <header
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
        style={{ background: scrolled ? "rgba(30,12,3,0.97)" : "linear-gradient(180deg,#2c1203 0%,#3d2108 100%)", boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.4)" : "none" }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between py-3 gap-4">

            {/* Лого */}
            <a href="#home" className="flex items-center gap-3 flex-shrink-0">
              <div className="relative">
                {/* Золотое кольцо вокруг мельницы */}
                <div className="rounded-full p-1" style={{ background: "radial-gradient(circle, #c8a03a 0%, #8b6914 100%)", padding: 2 }}>
                  <div className="rounded-full flex items-center justify-center" style={{ background: "#2c1203", padding: 4 }}>
                    <MillLogo size={46} />
                  </div>
                </div>
              </div>
              <div>
                <div className="font-bold text-lg leading-tight" style={{ color: "#f0d080", letterSpacing: "0.04em" }}>НОВЫЙ КОЛОС</div>
                <div className="text-xs tracking-widest" style={{ color: "#c8a03a", letterSpacing: "0.12em" }}>ПЕКАРНЯ · РОСТОВ-НА-ДОНУ</div>
              </div>
            </a>

            {/* Навигация — десктоп */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV.map(item => (
                <a key={item.name} href={item.href}
                  className="px-4 py-1.5 text-sm font-medium transition-all duration-150 rounded"
                  style={{ color: "rgba(255,255,255,0.75)", fontFamily: "sans-serif" }}
                  onMouseEnter={e => { (e.target as HTMLElement).style.color = "#f0d080"; (e.target as HTMLElement).style.background = "rgba(255,255,255,0.07)" }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.color = "rgba(255,255,255,0.75)"; (e.target as HTMLElement).style.background = "" }}
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Правая часть */}
            <div className="flex items-center gap-2">
              {/* Корзина */}
              <button onClick={() => setCartOpen(true)} className="relative flex items-center gap-1.5 text-sm font-semibold text-white px-4 py-2 rounded-full transition-all"
                style={{ background: "linear-gradient(135deg, #c0392b 0%, #e74c3c 100%)", fontFamily: "sans-serif" }}>
                <ShoppingCart className="w-4 h-4" />
                <span className="hidden sm:inline">Корзина</span>
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-[10px] font-bold text-white flex items-center justify-center"
                    style={{ background: "#f39c12" }}>{totalItems}</span>
                )}
              </button>

              {/* Бургер */}
              <button onClick={() => setMob(!mob)} className="lg:hidden p-2 text-white">
                <div className="w-5 h-0.5 bg-white mb-1" /><div className="w-5 h-0.5 bg-white mb-1" /><div className="w-5 h-0.5 bg-white" />
              </button>
            </div>
          </div>

          {/* Мобильное меню */}
          {mob && (
            <div className="lg:hidden border-t" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
              {NAV.map(i => (
                <a key={i.name} href={i.href} onClick={() => setMob(false)}
                  className="block px-4 py-3 text-sm border-b" style={{ color: "rgba(255,255,255,0.8)", borderColor: "rgba(255,255,255,0.06)", fontFamily: "sans-serif" }}>
                  {i.name}
                </a>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* ══ HERO ═════════════════════════════════════════════════════════════ */}
      <section id="home" className="relative overflow-hidden" style={{ paddingTop: 72 }}>
        <div className="relative" style={{ height: "min(480px, 55vw)", minHeight: 280 }}>
          <img
            src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1600&h=600&fit=crop&q=92"
            alt="Свежий хлеб"
            className="w-full h-full object-cover"
          />
          {/* Градиенты поверх */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(30,8,0,0.82) 0%, rgba(30,8,0,0.5) 45%, rgba(30,8,0,0.15) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(245,237,224,0.6) 0%, transparent 40%)" }} />

          {/* Текст */}
          <div className="absolute inset-0 flex items-center px-6 lg:px-16">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9 }}>
              <p className="text-xs tracking-widest mb-2" style={{ color: "#c8a03a", fontFamily: "sans-serif" }}>С 1997 ГОДА · РОСТОВ-НА-ДОНУ</p>
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-3 leading-tight">
                свежая выпечка<br />
                <span style={{ color: "#f0d080" }}>каждый день</span>
              </h1>
              <p className="text-sm text-white/70 mb-6 max-w-xs leading-relaxed" style={{ fontFamily: "sans-serif" }}>
                Продукция нашей пекарни поставляется<br />во многие магазины Ростова-на-Дону
              </p>
              <div className="flex gap-3 flex-wrap">
                <a href="#catalog" className="text-sm font-semibold text-white px-6 py-2.5 rounded transition-opacity hover:opacity-90" style={{ background: "linear-gradient(135deg,#c0392b,#e74c3c)", fontFamily: "sans-serif" }}>
                  Каталог продукции
                </a>
                <a href="#contact" className="text-sm font-semibold px-6 py-2.5 rounded border transition-opacity hover:opacity-90" style={{ color: "#f0d080", borderColor: "#c8a03a", background: "rgba(255,255,255,0.07)", fontFamily: "sans-serif" }}>
                  Стать партнёром
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Волна-разделитель */}
        <div style={{ height: 8, background: "linear-gradient(90deg, #c0392b 0%, #8b1a10 50%, #c0392b 100%)" }} />
      </section>

      {/* ══ О НАС ════════════════════════════════════════════════════════════ */}
      <section id="about" className="py-16" style={{ background: "linear-gradient(180deg, #f5ede0 0%, #ede0cc 100%)" }}>
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs tracking-widest mb-2" style={{ color: "#c0392b", fontFamily: "sans-serif" }}>О КОМПАНИИ</p>
              <h2 className="text-3xl font-bold mb-4 leading-snug" style={{ color: "#3d2108" }}>
                Высокое качество.<br />Широкий ассортимент.
              </h2>
              <p className="text-sm leading-relaxed mb-3" style={{ color: "#5a3010", fontFamily: "sans-serif" }}>
                ООО «Новый Колос» — пекарня в Ростове-на-Дону с 1997 года. За более чем 25 лет мы стали надёжным поставщиком для сотен торговых точек и предприятий города.
              </p>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "#5a3010", fontFamily: "sans-serif" }}>
                Мы используем только натуральные ингредиенты — никаких консервантов. Каждый день свежая выпечка прямо с пекарни.
              </p>
              <div className="flex gap-6 mb-6">
                {[["25+", "лет"], ["50+", "видов"], ["200+", "партнёров"]].map(([v, l]) => (
                  <div key={l} className="text-center">
                    <div className="text-2xl font-bold" style={{ color: "#c0392b" }}>{v}</div>
                    <div className="text-xs" style={{ color: "#7a5c3a", fontFamily: "sans-serif" }}>{l}</div>
                  </div>
                ))}
              </div>
              <a href="#contact" className="inline-block text-sm font-semibold text-white px-6 py-2.5 rounded hover:opacity-90 transition-opacity" style={{ background: "linear-gradient(135deg,#c0392b,#e74c3c)", fontFamily: "sans-serif" }}>
                Связаться с нами
              </a>
            </div>

            {/* Сетка из 4 фото */}
            <div className="grid grid-cols-2 gap-3">
              {[
                "https://images.unsplash.com/photo-1574085733277-851d9d856a3a?w=300&h=220&fit=crop&q=88",
                "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=300&h=220&fit=crop&q=88",
                "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=300&h=220&fit=crop&q=88",
                "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=220&fit=crop&q=88",
              ].map((src, i) => (
                <div key={i} className="rounded-lg overflow-hidden shadow-md" style={{ aspectRatio: "4/3" }}>
                  <img src={src} alt="Продукция" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ ПРОДУКЦИЯ-БЛОК (тёмный) ══════════════════════════════════════════ */}
      <section style={{ background: "linear-gradient(135deg, #1e0800 0%, #3d2108 60%, #2c1203 100%)" }} className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-2" style={{ color: "#f0d080" }}>Наша продукция</h2>
          <p className="text-center text-sm mb-10" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "sans-serif" }}>Более 50 наименований · ежедневно свежее</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {[
              { icon: "🥐", name: "Сдобная продукция", desc: "Пышные изделия с разнообразными начинками" },
              { icon: "🍞", name: "Хлебная продукция", desc: "Пшеничный, ржаной, батон — классика" },
              { icon: "🥐", name: "Слоёная продукция", desc: "Воздушное слоёное тесто, круассаны" },
              { icon: "🍪", name: "Печенье", desc: "Домашнее рассыпчатое на каждый день" },
              { icon: "🎂", name: "Торты и пирожные", desc: "Классические рецептуры и современные вкусы" },
              { icon: "🥗", name: "Готовые закуски", desc: "Сэндвичи и закуски свежего производства" },
            ].map((c, i) => (
              <div key={i} className="flex flex-col items-center text-center p-5 rounded-xl transition-all hover:scale-105"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(200,160,58,0.2)" }}>
                <div className="text-4xl mb-3">{c.icon}</div>
                <h3 className="text-sm font-bold mb-1" style={{ color: "#f0d080" }}>{c.name}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "sans-serif" }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ КАТАЛОГ ══════════════════════════════════════════════════════════ */}
      <section id="catalog" className="py-16" style={{ background: "linear-gradient(180deg, #ede0cc 0%, #e5d4b8 100%)" }}>
        <div className="max-w-5xl mx-auto px-4">
          <p className="text-xs tracking-widest text-center mb-1" style={{ color: "#c0392b", fontFamily: "sans-serif" }}>АССОРТИМЕНТ</p>
          <h2 className="text-3xl font-bold text-center mb-8" style={{ color: "#3d2108" }}>Каталог продукции</h2>

          {/* Фильтры */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {CATS.map(c => (
              <button key={c} onClick={() => setCat(c)}
                className="text-xs font-semibold px-4 py-1.5 rounded-full transition-all"
                style={{
                  background: cat === c ? "linear-gradient(135deg,#c0392b,#e74c3c)" : "rgba(61,33,8,0.08)",
                  color: cat === c ? "white" : "#5a3010",
                  border: cat === c ? "none" : "1px solid rgba(61,33,8,0.15)",
                  fontFamily: "sans-serif",
                }}>
                {c}
              </button>
            ))}
          </div>

          {/* Карточки товаров */}
          <motion.div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" layout>
            {filtered.map(p => (
              <motion.div key={p.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group"
                style={{ border: "1px solid rgba(200,160,58,0.2)" }}>
                <div className="relative overflow-hidden" style={{ height: 160 }}>
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(30,8,0,0.4) 0%, transparent 50%)" }} />
                </div>
                <div className="p-3">
                  <p className="text-xs font-semibold leading-tight mb-2" style={{ color: "#3d2108" }}>{p.name}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm" style={{ color: "#c0392b" }}>{p.price} ₽</span>
                    <button onClick={() => addToCart(p)}
                      className="text-[10px] font-bold text-white px-2.5 py-1 rounded-full transition-opacity hover:opacity-80"
                      style={{ background: "linear-gradient(135deg,#3d2108,#5a3010)", fontFamily: "sans-serif" }}>
                      + В корзину
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Мини-игра */}
          <div className="text-center mt-10 py-6 rounded-2xl" style={{ background: "linear-gradient(135deg,#3d2108,#5a3010)" }}>
            <p className="text-sm text-white/70 mb-2" style={{ fontFamily: "sans-serif" }}>Есть минутка?</p>
            <button onClick={() => setGameOpen(true)}
              className="text-sm font-bold text-white px-7 py-2.5 rounded-full hover:opacity-90 transition-opacity"
              style={{ background: "linear-gradient(135deg,#c0392b,#e74c3c)", fontFamily: "sans-serif" }}>
              🎮 Поиграть — «Поймай хлебушек»
            </button>
          </div>
        </div>
      </section>

      {/* ══ ВАКАНСИИ ════════════════════════════════════════════════════════ */}
      <section id="jobs" className="py-14" style={{ background: "linear-gradient(180deg,#f5ede0,#ede0cc)" }}>
        <div className="max-w-4xl mx-auto px-4 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-xs tracking-widest mb-1" style={{ color: "#c0392b", fontFamily: "sans-serif" }}>КАРЬЕРА</p>
            <h2 className="text-2xl font-bold mb-4" style={{ color: "#3d2108" }}>Открытые вакансии</h2>
            <ul className="space-y-2 mb-5">
              {["Технолог хлебопекарного производства", "Торговый представитель", "Водитель-экспедитор"].map((j, i) => (
                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "#5a3010", fontFamily: "sans-serif" }}>
                  <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: "#c0392b" }} />{j}
                </li>
              ))}
            </ul>
            <p className="text-sm" style={{ color: "#5a3010", fontFamily: "sans-serif" }}>
              Телефон: <strong style={{ color: "#3d2108" }}>+7 909 789 93 99</strong>
            </p>
          </div>
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img src="https://images.unsplash.com/photo-1593339471078-eb4c66e0c7c0?w=600&h=300&fit=crop&q=88" alt="Пекарня" className="w-full object-cover" style={{ height: 220 }} />
          </div>
        </div>
      </section>

      {/* ══ КОНТАКТЫ ════════════════════════════════════════════════════════ */}
      <section id="contact" className="py-14" style={{ background: "linear-gradient(135deg,#2c1203 0%,#3d2108 100%)" }}>
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10" style={{ color: "#f0d080" }}>Наши контакты</h2>
          <div className="grid lg:grid-cols-2 gap-10">
            <div>
              <h3 className="font-bold mb-4" style={{ color: "#c8a03a" }}>ООО «Новый Колос»</h3>
              <div className="space-y-3 text-sm mb-6" style={{ fontFamily: "sans-serif" }}>
                <p style={{ color: "rgba(255,255,255,0.65)" }}>344018, г. Ростов-на-Дону, ул. Металлургическая, 8</p>
                <div className="flex items-center gap-2" style={{ color: "rgba(255,255,255,0.8)" }}>
                  <Phone className="w-4 h-4" style={{ color: "#c0392b" }} /> +7 909 789 93 99
                </div>
                <div className="flex items-center gap-2" style={{ color: "rgba(255,255,255,0.8)" }}>
                  <Phone className="w-4 h-4" style={{ color: "#c0392b" }} /> +7 863 232 09 09
                </div>
                <div className="flex items-center gap-2" style={{ color: "rgba(255,255,255,0.8)" }}>
                  <Mail className="w-4 h-4" style={{ color: "#c0392b" }} /> novkolos@mail.ru
                </div>
              </div>

              <h3 className="font-semibold mb-3" style={{ color: "#c8a03a" }}>Оставить сообщение</h3>
              <div className="space-y-3">
                <input type="text" placeholder="Ваше имя" className="w-full text-sm px-3 py-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#c0392b]"
                  style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(200,160,58,0.25)", color: "white", fontFamily: "sans-serif" }} />
                <input type="text" placeholder="Телефон или e-mail" className="w-full text-sm px-3 py-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#c0392b]"
                  style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(200,160,58,0.25)", color: "white", fontFamily: "sans-serif" }} />
                <textarea rows={3} placeholder="Сообщение" className="w-full text-sm px-3 py-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#c0392b] resize-none"
                  style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(200,160,58,0.25)", color: "white", fontFamily: "sans-serif" }} />
                <button className="w-full text-sm font-bold text-white py-2.5 rounded-lg hover:opacity-90 transition-opacity"
                  style={{ background: "linear-gradient(135deg,#c0392b,#e74c3c)", fontFamily: "sans-serif" }}>
                  Отправить
                </button>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden shadow-xl" style={{ height: 340, border: "1px solid rgba(200,160,58,0.2)" }}>
              <iframe
                src="https://maps.google.com/maps?q=Ростов-на-Дону,ул.Металлургическая,8&output=embed&hl=ru"
                width="100%" height="100%" style={{ border: 0 }} loading="lazy" title="Карта"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══════════════════════════════════════════════════════════ */}
      <footer style={{ background: "#1a0900" }} className="py-8">
        <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-3 gap-6 text-xs" style={{ fontFamily: "sans-serif" }}>
          <div>
            <div className="font-bold mb-2" style={{ color: "#c8a03a" }}>О Нас</div>
            <p style={{ color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>
              ООО «Новый Колос» — пекарня в Ростове-на-Дону с 1997 года. Ежедневно свежая выпечка для партнёров города.
            </p>
          </div>
          <div>
            <div className="font-bold mb-2" style={{ color: "#c8a03a" }}>Как нас найти</div>
            <div style={{ color: "rgba(255,255,255,0.45)", lineHeight: 2 }}>
              <div>344018, г. Ростов-на-Дону</div>
              <div>ул. Металлургическая, 8</div>
              <div>+7 909 789 93 99</div>
              <div>novkolos@mail.ru</div>
            </div>
          </div>
          <div>
            <div className="font-bold mb-2" style={{ color: "#c8a03a" }}>Меню</div>
            <div className="space-y-1.5">
              {NAV.map(i => (
                <a key={i.name} href={i.href} className="block hover:opacity-80 transition-opacity" style={{ color: "rgba(255,255,255,0.45)" }}>{i.name}</a>
              ))}
            </div>
          </div>
        </div>
        <div className="text-center text-[10px] mt-6" style={{ color: "rgba(255,255,255,0.2)", fontFamily: "sans-serif" }}>
          © 2025 ООО «Новый Колос». Все права защищены.
        </div>
      </footer>

      {/* ══ КОРЗИНА ═════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {cartOpen && <CartPanel cart={cart} onClose={() => setCartOpen(false)} onAdd={addQty} onRemove={removeQty} onDelete={del} />}
      </AnimatePresence>

      {/* ══ ИГРА ════════════════════════════════════════════════════════════ */}
      {gameOpen && <BreadGame onClose={() => setGameOpen(false)} />}
    </div>
  )
}
