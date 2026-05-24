/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import { FaWhatsapp } from "react-icons/fa";
import {
  X,
  Send,
  Phone,
  Mail,
  Instagram,
  Twitter,
  ChevronRight,
  Coffee,
  Globe,
  Star,
} from "lucide-react";
import Footer from "./components/Footer";

gsap.registerPlugin(ScrollTrigger);

/* =========================================================
   i18n SETUP
========================================================= */
const resources = {
  en: {
    translation: {
      nav: {
        brand: "Al-Minshawi",
        collections: "Collections",
        process: "Process",
        experience: "Experience",
        contact: "Contact",
      },
      preloader: {
        since: "Since 2024",
        tagline: "Crafted with excellence",
      },
      hero: {
        title: "THE PURSUIT",
        subtitle: "OF PERFECTION",
        cta: "Explore Collection",
        scroll: "Scroll to discover",
        eyebrow: "Single Origin · Specialty Grade",
        taglineLine1: "Artisan specialty coffee.",
        taglineLine2: "Sourced from the world's",
        taglineLine3: "finest highland farms.",
        ourStory: "Our Story",
        badge: "SPECIALTY · ARTISAN · EST 2026 ·",
        imgAlt: "Specialty coffee pour",
        card: {
          badge: "New Offering",
          name1: "Kenya",
          name2: "Nyeri",
          notes1: "Blackberry · Jasmine",
          notes2: "Brown Sugar",
          price: "$22.00",
          shop: "Shop",
        },
      },
      origin: {
        label: "S01 / ORIGIN",
        coords: "06°N 75°W",
        title: "From Source to Cup",
        body: "Every bean tells a story of terroir, altitude, and meticulous cultivation. We traverse the equatorial belt to source only the finest Arabica from volcanic highlands.",
        cta: "Our Origins",
        imgAlt: "Origin facility",
      },
      products: {
        label: "S02 / COLLECTIONS",
        title: "The Archive",
        subtitle: "Curated roasts for the discerning palate",
      },
      experience: {
        label: "S03 / CRAFT",
        title: "The Experience",
        roasting: {
          title: "Precision Roasting",
          desc: "Small-batch roasting profiles calibrated to origin characteristics, unlocking the full potential of each bean.",
        },
        brewing: {
          title: "Artisan Brewing",
          desc: "Methodical extraction techniques refined over decades, delivering consistently exceptional cups.",
        },
        sourcing: {
          title: "Ethical Sourcing",
          desc: "Direct trade relationships ensuring fair compensation for farming communities and sustainable practices.",
        },
      },
      testimonials: { label: "S04 / VOICES", title: "What They Say" },
      footer: {
        tagline: "The perfect blend of luxury and technology.",
        collections: "Collections",
        process: "Brewing Process",
        sustainability: "Sustainability",
        rights: "Al-Minshawi Coffee. All rights reserved.",
        contact: "Contact Us",
        findUs: "Find Us Here",
        location: "Tanta, El-Gharbia, Egypt",
        premiumExperience: "A Premium Coffee Experience",
        experience: "Coffee Experience",
        freshBeans: "Fresh Roasted Beans",
        freshBeansDesc:
          "Premium coffee crafted fresh every day for the perfect taste",
        primeLocation: "Prime Location",
        primeLocationDesc: "Easy to reach in the heart of Tanta",
        builtBy: "Built by",
        brand: "Al-Minshawi",
        cafeName: "Al-Minshawi Coffee",
        country: "Egypt",
      },
      chat: {
        title: "Al-Minshawi Concierge",
        subtitle: "AI Coffee Assistant",
        placeholder: "Ask about our coffees...",
        send: "Send",
        welcome:
          "Welcome to Al-Minshawi. I am your personal coffee concierge. How may I assist you today?",
        error: "Apologies, I am unable to connect. Please try again.",
        typing: "Typing...",
        buttonTitle: "AI Concierge",
      },
      buttons: {
        whatsapp: "WhatsApp",
      },
      whatsapp: {
        en: "Hello, I want to create a landing page with the same quality and design as this website.",
      },
    },
  },
  ar: {
    translation: {
      nav: {
        brand: "المنشاوي",
        collections: "المجموعات",
        process: "العملية",
        experience: "التجربة",
        contact: "تواصل",
      },
      preloader: {
        since: "منذ 2024",
        tagline: "مصنوع بامتياز",
      },
      hero: {
        title: "السعي",
        subtitle: "نحو الكمال",
        cta: "استكشف المجموعة",
        scroll: "مرر للاستكشاف",
        eyebrow: "أصل واحد · درجة متخصصة",
        taglineLine1: "قهوة متخصصة حرفية.",
        taglineLine2: "مصدرها من أفضل",
        taglineLine3: "مزارع الهضاب في العالم.",
        ourStory: "قصتنا",
        badge: "متخصص · حرفي · تأسس 2026 ·",
        imgAlt: "صب قهوة متخصصة",
        card: {
          badge: "عرض جديد",
          name1: "كينيا",
          name2: "نيري",
          notes1: "توت بري · ياسمين",
          notes2: "سكر بني",
          price: "$22.00",
          shop: "تسوق",
        },
      },
      origin: {
        label: "S01 / المنشأ",
        coords: "06°N 75°W",
        title: "من المصدر إلى الفنجان",
        body: "كل حبة تحكي قصة تيروار وارتفاع وزراعة دقيقة. نجوب الحزام الاستوائي لنحصل فقط على أجود أنواع الأرابيكا من الهضاب البركانية.",
        cta: "أصولنا",
        imgAlt: "منشأة المصدر",
      },
      products: {
        label: "S02 / المجموعات",
        title: "الأرشيف",
        subtitle: "تحميص منقى للذواقة المرهفة",
      },
      experience: {
        label: "S03 / الحرفية",
        title: "التجربة",
        roasting: {
          title: "التحميص الدقيق",
          desc: "ملفات تحميص الدفعات الصغيرة المعايرة وفقاً لخصائص المنشأ، لإطلاق الإمكانات الكاملة لكل حبة.",
        },
        brewing: {
          title: "التحضير اليدوي",
          desc: "تقنيات الاستخلاص المنهجية المثلى على مدى عقود، لتقديم أكواب استثنائية باستمرار.",
        },
        sourcing: {
          title: "الاستدامة الأخلاقية",
          desc: "علاقات التجارة المباشرة تضمن تعويضاً عادلاً لمجتمعات المزارعين وممارسات مستدامة.",
        },
      },
      testimonials: { label: "S04 / الآراء", title: "ماذا يقولون" },
      footer: {
        tagline: "الخلطة اللي بتجمع بين الفخامة والتكنولوجيا.",
        collections: "التشكيلات",
        process: "طريقة التحضير",
        sustainability: "الاستدامة",
        rights: "قهوة المنشاوي. كل الحقوق محفوظة.",
        contact: "كلمنا",
        findUs: "هتلاقينا هنا",
        location: "طنطا، الغربية، مصر",
        premiumExperience: "تجربة قهوة على المزاج",
        experience: "تجربة القهوة",
        freshBeans: "حبوب طازة متحمصة",
        freshBeansDesc: "قهوة بريميوم بتتعمل يوم بيوم عشان أفضل طعم",
        primeLocation: "لوكيشن ممتاز",
        primeLocationDesc: "في مكان سهل توصله بقلب طنطا",
        builtBy: "اتعمل بواسطة",
        brand: "المنشاوي",
        cafeName: "قهوة المنشاوي",
        country: "مصر",
      },
      chat: {
        title: "كونسيرج المنشاوي",
        subtitle: "مساعد القهوة الذكي",
        placeholder: "اسأل عن قهوتنا...",
        send: "إرسال",
        welcome:
          "مرحباً بك في المنشاوي. أنا مساعدك الشخصي. كيف يمكنني مساعدتك اليوم؟",
        error: "عذراً، لا أستطيع الاتصال. يرجى المحاولة مرة أخرى.",
        typing: "يكتب...",
        buttonTitle: "المساعد الذكي",
      },
      buttons: {
        whatsapp: "واتساب",
      },
      whatsapp: {
        ar: "مرحبا، أريد إنشاء لاندينج بيدج بنفس جودة وتصميم هذا الموقع.",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

/* =========================================================
   COLOR TOKENS
========================================================= */
const C = {
  espresso: "#1A1412",
  umber: "#3E3836",
  cacao: "wheat",
  taupe: "#8C827C",
  bone: "#F2EBE5",
  bronze: "#B85C38",
};

/* =========================================================
   PRODUCT DATA
========================================================= */
const products = [
  {
    name: "Ethiopia Yirgacheffe",
    notes: "Jasmine, Bergamot, Citrus",
    price: "$28",
    img: "/images/product-beans.jpg",
  },
  {
    name: "Colombia Huila",
    notes: "Caramel, Red Apple, Honey",
    price: "$24",
    img: "/images/product-cup.jpg",
  },
  {
    name: "Kenya AA",
    notes: "Blackcurrant, Grapefruit, Brown Sugar",
    price: "$32",
    img: "/images/product-bag.jpg",
  },
  {
    name: "Guatemala Antigua",
    notes: "Chocolate, Almond, Spice",
    price: "$26",
    img: "/images/product-portafilter.jpg",
  },
  {
    name: "Brazil Santos",
    notes: "Nutty, Cocoa, Smooth",
    price: "$22",
    img: "/images/product-roasting.jpg",
  },
  {
    name: "Costa Rica Tarrazu",
    notes: "Milk Chocolate, Orange, Clean",
    price: "$30",
    img: "/images/product-brewing.jpg",
  },
];

const testimonials = [
  {
    name: "Mahmoud Salem",
    role: "Creative Director",
    text: "Al-Minshawi transformed my morning ritual into a meditation. The depth of flavor is unlike anything I have experienced.",
    img: "/images/testimonial-1.jpg",
  },
  {
    name: "Sara Ahmed",
    role: "Brand Strategist",
    text: "Each cup is a journey. The sourcing transparency and quality consistency make Al-Minshawi my only choice for premium coffee.",
    img: "/images/testimonial-2.jpg",
  },
  {
    name: "Ahmed Mohmed",
    role: "Architect",
    text: "I have sampled coffee across five continents. Al-Minshawi stands alone at the summit. Pure craftsmanship in every bean.",
    img: "/images/testimonial-3.jpg",
  },
];

/* =========================================================
   LEATHER FLUID SHADER (WebGL Hero Background)
========================================================= */
// const fluidVertexShader = `
// precision highp float;
// varying vec2 v_uv;
// void main(){
//   v_uv = uv;
//   gl_Position = vec4(position, 1.0);
// }`;

// const fluidSimFragment = `
// precision highp float;
// uniform sampler2D uFluidPrev;
// uniform vec2 uResolution;
// uniform vec4 iMouse;
// uniform float uBrushSize;
// uniform float uBrushStrength;
// uniform float uFluidDecay;
// uniform float uTrailLength;
// uniform float uStopDecay;
// varying vec2 v_uv;

// vec3 encodeFluid(vec3 v){ return v / 0.8 + 0.5; }
// vec3 decodeFluid(vec3 c){ return (c - 0.5) * 0.8; }
// vec4 encodeState(vec2 vel, float ink, float flags){ return vec4(encodeFluid(vec3(vel, ink)), flags); }
// vec4 decodeState(vec4 raw){ return vec4(decodeFluid(raw.rgb), raw.a); }

// vec4 cellState(vec2 uv){
//   vec4 s = texture2D(uFluidPrev, uv);
//   vec4 c = decodeState(s);
//   return vec4(c.rg, c.b, c.a);
// }

// void main(){
//   vec2 texel = vec2(1.0) / uResolution;
//   float aspect = uResolution.x / uResolution.y;
//   vec4 state = texture2D(uFluidPrev, v_uv);
//   vec4 c = decodeState(state);
//   vec2 vel = c.rg;
//   float ink = c.b;
//   float flags = c.a;

//   vec4 left = cellState(v_uv + vec2(-texel.x, 0.0));
//   vec4 right = cellState(v_uv + vec2(texel.x, 0.0));
//   vec4 up = cellState(v_uv + vec2(0.0, texel.y));
//   vec4 down = cellState(v_uv - vec2(0.0, texel.y));

//   vec2 avgVel = (left.rg + right.rg + up.rg + down.rg) * 0.25;
//   float avgInk = (left.b + right.b + up.b + down.b) * 0.25;
//   vel = mix(vel, avgVel, 0.18);
//   ink = mix(ink, avgInk, 0.18);

//   float div = ((right.x - left.x) + (up.y - down.y)) * 0.5;
//   vel -= vec2(right.x - left.x, up.y - down.y) * 0.25;

//   vec2 advectUV = v_uv - vel * texel * 1.0;
//   vec4 advected = decodeState(texture2D(uFluidPrev, advectUV));
//   vel = mix(vel, advected.rg, 0.12);
//   ink = mix(ink, advected.b, 0.12);

//   vec2 mousePos = iMouse.xy;
//   vec2 mousePrev = iMouse.zw;
//   vec2 motion = mousePos - mousePrev;

//   vec2 toMouse = v_uv - mousePos;
//   toMouse.x *= aspect;
//   float mouseDist = length(toMouse);
//   float brushFalloff = exp(-mouseDist * mouseDist * 6.0 * (10.0 - uBrushSize));

//   float motionLen = 0.0;
//   if(length(motion) > 0.0){
//     float brushSizeFactor = 3.0e-4 + (1.0 - uBrushSize * 0.09) * 1.3e-4;
//     float strengthFactor = uBrushStrength * 2.2e-4;
//     motionLen = max(length(motion), 1e-6);
//     vec2 motionDir = motion / motionLen;
//     vel += motionDir * strengthFactor * brushFalloff;
//     ink += brushFalloff * strengthFactor * 1.1;
//   }

//   vel *= uFluidDecay;
//   ink *= uTrailLength;

//   toMouse = v_uv - mousePos;
//   toMouse.x *= aspect;
//   float distToPointer = length(toMouse);
//   float nearPointer = distToPointer < 0.12 ? 1.0 : 0.0;

//   if(motionLen > 6.0){
//     vel *= uStopDecay;
//     ink *= uStopDecay;
//     flags = 0.0;
//   }

//   flags = nearPointer;
//   vel = clamp(vel, -0.4, 0.4);
//   ink = clamp(ink, -0.4, 0.4);
//   gl_FragColor = encodeState(vel, ink, flags);
// }`;

// const fluidRenderFragment = `
// precision highp float;
// uniform float u_time;
// uniform vec2 u_resolution;
// uniform sampler2D u_fluid;
// varying vec2 v_uv;

// float random(vec2 st){
//   return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
// }

// float smoothNoise(vec2 p){
//   vec2 i = floor(p);
//   vec2 f = fract(p);
//   vec2 u = f * f * (3.0 - 2.0 * f);
//   return mix(
//     mix(random(i), random(i + vec2(1.0, 0.0)), u.x),
//     mix(random(i + vec2(0.0, 1.0)), random(i + vec2(1.0, 1.0)), u.x),
//     u.y
//   );
// }

// float fbm(vec2 p){
//   float value = 0.0;
//   float amplitude = 0.5;
//   float frequency = 1.0;
//   for(int i = 0; i < 5; i++){
//     value += amplitude * smoothNoise(p * frequency);
//     frequency *= 3.0;
//     amplitude *= 0.5;
//   }
//   return value;
// }

// vec3 sampleFluidState(vec2 uv){ return texture2D(u_fluid, uv).rgb; }
// vec2 getFluidVelocity(vec2 uv){ return (sampleFluidState(uv).rg - 0.5) * 0.8; }

// void main(){
//   vec2 uv = v_uv;
//   vec3 fluidState = sampleFluidState(v_uv);
//   vec2 fluidVel = (fluidState.rg - 0.5) * 0.8;
//   uv += fluidVel * (0.038 + 0.18 * fluidState.z);
//   uv.x *= u_resolution.x / u_resolution.y;

//   float pattern1 = fbm(uv * 1.5 + fbm(uv * 2.0 + u_time * 0.1));
//   vec2 q = vec2(
//     fbm(uv + vec2(1.0, 0.0) + u_time * 0.05),
//     fbm(uv + vec2(0.0, 1.0) + u_time * 0.04)
//   );
//   float pattern2 = fbm(uv + 2.0 * q);
//   float finalPattern = mix(pattern1, pattern2, 0.5);

//   vec3 darkColor = vec3(0.10, 0.07, 0.07);
//   vec3 midColor = vec3(0.72, 0.36, 0.22);
//   vec3 lightColor = vec3(0.95, 0.92, 0.90);
//   vec3 finalColor = mix(darkColor, midColor, finalPattern);
//   finalColor = mix(finalColor, lightColor, smoothstep(0.4, 0.8, finalPattern));

//   float dist = length(v_uv - vec2(0.5));
//   finalColor *= 1.0 - smoothstep(0.4, 1.2, dist);
//   gl_FragColor = vec4(finalColor, 1.0);
// }`;

/* =========================================================
   INFINITE LOOP SHADERS
========================================================= */
const loopVertexShader = `
precision highp float;
attribute vec3 position;
attribute vec2 uv;
uniform float uScrollSpeed;
uniform float uCurveStrength;
uniform float uCurveFrequency;
varying vec2 vUv;

mat4 rotationMatrix(vec3 axis, float angle){
  axis = normalize(axis);
  float s = sin(angle);
  float c = cos(angle);
  float oc = 1.0 - c;
  return mat4(
    oc * axis.x * axis.x + c, oc * axis.x * axis.y - axis.z * s, oc * axis.z * axis.x + axis.y * s, 0.0,
    oc * axis.x * axis.y + axis.z * s, oc * axis.y * axis.y + c, oc * axis.y * axis.z - axis.x * s, 0.0,
    oc * axis.z * axis.x - axis.y * s, oc * axis.y * axis.z + axis.x * s, oc * axis.z * axis.z + c, 0.0,
    0.0, 0.0, 0.0, 1.0
  );
}

vec3 rotate(vec3 v, vec3 axis, float angle){
  return (rotationMatrix(axis, angle) * vec4(v, 1.0)).xyz;
}

#define PI 3.14159265359

void main(){
  vec3 pos = position;
  vec3 worldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
  float xDisplacement = uCurveStrength * cos(worldPosition.y * uCurveFrequency);
  pos.x += xDisplacement;
  pos.x -= uCurveStrength;
  float yDisplacement = -sin(uv.x * PI) * uScrollSpeed;
  pos.y += yDisplacement;
  float zRotation = -uScrollSpeed * pos.x * 0.03;
  pos = rotate(pos, vec3(0.0, 0.0, 1.0), zRotation);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  vUv = uv;
}`;

const loopFragmentShader = `
precision highp float;
uniform sampler2D uTexture;
uniform vec2 uPlaneSizes;
uniform vec2 uImageSizes;
varying vec2 vUv;

void main(){
  vec2 ratio = vec2(
    min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
    min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
  );
  vec2 uv;
  uv.x = vUv.x * ratio.x + (1.0 - ratio.x) * 0.5;
  uv.y = vUv.y * ratio.y + (1.0 - ratio.y) * 0.5;
  gl_FragColor = texture2D(uTexture, uv);
}`;

/* =========================================================
   AI CHAT MODAL
========================================================= */
function ChatModal({ lang, open, onClose }) {
  const { t } = useTranslation();

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: t("chat.welcome"),
    },
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const chatEndRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const sendMessage = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();

    const updatedMessages = [
      ...messages,
      {
        role: "user",
        text: userMessage,
      },
    ];

    setMessages(updatedMessages);
    setInput("");
    setIsTyping(true);

    try {
      const formattedMessages = updatedMessages.map((m) => ({
        role: m.role,
        content: m.text,
      }));

      const res = await fetch(
        "https://al-minshawi-chat-bot.vercel.app/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: formattedMessages,
          }),
        },
      );

      if (!res.ok) {
        throw new Error("Request failed");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder("utf-8");

      let assistantReply = "";

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "",
        },
      ]);

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        const chunk = decoder.decode(value, {
          stream: true,
        });

        assistantReply += chunk;

        setMessages((prev) => {
          const cloned = [...prev];

          cloned[cloned.length - 1] = {
            role: "assistant",
            text: assistantReply,
          };

          return cloned;
        });
      }
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: t("chat.error"),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-end  ${lang == "ar" ? "justify-start" : "justify-end"}`}
      style={{
        pointerEvents: open ? "auto" : "none",
      }}
    >
      {open && (
        <div
          className="absolute inset-0"
          onClick={onClose}
          style={{
            background: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(6px)",
          }}
        />
      )}

      <div
        className="relative m-4 sm:m-6 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl transition-all duration-500"
        style={{
          background: "rgba(26,20,18,0.88)",
          backdropFilter: "blur(24px) saturate(160%)",
          border: "1px solid rgba(255,255,255,0.08)",
          transform:
            open ? "translateY(0) scale(1)" : "translateY(25px) scale(.96)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
        }}
      >
        {/* HEADER */}
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{
                background: C.bronze,
              }}
            >
              <Coffee size={15} color={C.bone} />
            </div>

            <div className="flex flex-col">
              <span
                style={{
                  color: C.bone,
                  fontSize: "12px",
                  fontFamily: "monospace",
                  letterSpacing: ".12em",
                  textTransform: "uppercase",
                }}
              >
                {t("chat.title")}
              </span>

              <span
                style={{
                  color: C.taupe,
                  fontSize: "10px",
                  fontFamily: "monospace",
                }}
              >
                {t("chat.subtitle")}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <X size={16} color={C.taupe} />
          </button>
        </div>

        {/* MESSAGES */}
        <div
          className="px-4 py-4 overflow-y-auto"
          style={{
            height: "420px",
            scrollbarWidth: "thin",
          }}
        >
          {messages.map((m, i) => (
            <div
              key={i}
              className={`mb-3 flex ${
                m.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className="max-w-[82%] px-4 py-3 rounded-2xl whitespace-pre-wrap break-words"
                style={{
                  background:
                    m.role === "user" ? C.bronze : "rgba(255,255,255,0.05)",

                  color: C.bone,

                  fontFamily: "monospace",
                  fontSize: "12px",
                  lineHeight: 1.7,

                  borderBottomRightRadius:
                    m.role === "user" ? "6px" : undefined,

                  borderBottomLeftRadius:
                    m.role === "assistant" ? "6px" : undefined,
                }}
              >
                {m.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start mb-3">
              <div
                className="px-4 py-3 rounded-2xl"
                style={{
                  background: "rgba(255,255,255,0.05)",
                }}
              >
                <div className="flex gap-1">
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-bounce"
                    style={{
                      background: C.taupe,
                      animationDelay: "0ms",
                    }}
                  />

                  <span
                    className="w-1.5 h-1.5 rounded-full animate-bounce"
                    style={{
                      background: C.taupe,
                      animationDelay: "150ms",
                    }}
                  />

                  <span
                    className="w-1.5 h-1.5 rounded-full animate-bounce"
                    style={{
                      background: C.taupe,
                      animationDelay: "300ms",
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* INPUT */}
        <div
          className="px-4 py-3 flex gap-2"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t("chat.placeholder")}
            className="flex-1 px-4 py-3 rounded-xl outline-none"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.06)",
              color: C.bone,
              fontFamily: "monospace",
              fontSize: "12px",
            }}
          />

          <button
            onClick={sendMessage}
            disabled={isTyping}
            className="p-3 rounded-xl transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
            style={{
              background: C.bronze,
            }}
          >
            <Send size={15} color={C.bone} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MAIN APP
========================================================= */
export default function App() {
  const { t, i18n: i18nInstance } = useTranslation();
  const [chatOpen, setChatOpen] = useState(false);
  const [lang, setLang] = useState("en");
  const [loaded, setLoaded] = useState(false);
  const lenisRef = useRef(null);
  const heroRef = useRef(null);
  const featureRef = useRef(null);
  const featureImgRef = useRef(null);
  const featureTextRef = useRef(null);
  const productsLabelRef = useRef(null);
  const expRefs = useRef([]);

  // Preloader
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  // Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Hero parallax entrance
  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-title-line",
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.4,
          ease: "power3.out",
          stagger: 0.15,
          delay: 2,
        },
      );
      gsap.fromTo(
        ".hero-sub",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 2.6 },
      );
      gsap.fromTo(
        ".hero-cta",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 2.9 },
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  // Feature section GSAP
  useEffect(() => {
    if (
      !featureRef.current ||
      !featureImgRef.current ||
      !featureTextRef.current
    )
      return;
    const ctx = gsap.context(() => {
      // Image clip-path reveal
      gsap.fromTo(
        featureImgRef.current,
        { clipPath: "inset(20% 0% round 20vw)" },
        {
          clipPath: "inset(0% 0% round 0vw)",
          ease: "none",
          scrollTrigger: {
            trigger: featureRef.current,
            start: "top 80%",
            end: "top 20%",
            scrub: true,
          },
        },
      );
      // Inner image counter-motion
      const img = featureImgRef.current?.querySelector("img");
      if (img) {
        gsap.fromTo(
          img,
          { xPercent: -40 },
          {
            xPercent: 40,
            ease: "power1.inOut",
            scrollTrigger: {
              trigger: featureRef.current,
              start: "top 80%",
              end: "top 20%",
              scrub: true,
            },
          },
        );
      }
      // Text stagger reveal
      gsap.fromTo(
        ".feature-text-item",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: featureTextRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, featureRef);
    return () => ctx.revert();
  }, []);

  // Products label animation
  useEffect(() => {
    if (!productsLabelRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".products-title",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: productsLabelRef.current,
            start: "top 85%",
          },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  // Experience cards animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      expRefs.current.forEach((ref, i) => {
        if (!ref) return;
        gsap.fromTo(
          ref,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            delay: i * 0.15,
            scrollTrigger: {
              trigger: ref,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    });
    return () => ctx.revert();
  }, []);

  // Testimonial animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".testimonial-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: { trigger: ".testimonials-grid", start: "top 85%" },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  // Scroll animations for footer
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".footer-fade",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".footer-section", start: "top 90%" },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  const toggleLang = () => {
    const newLang = lang === "en" ? "ar" : "en";
    setLang(newLang);
    i18nInstance.changeLanguage(newLang);
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
  };

  const openWhatsApp = () => {
    const msg =
      lang === "ar" ?
        resources.ar.translation.whatsapp.ar
      : resources.en.translation.whatsapp.en;
    window.open(
      `https://wa.me/201080761700?text=${encodeURIComponent(msg)}`,
      "_blank",
    );
  };

  const experienceItems = [
    {
      title: t("experience.roasting.title"),
      desc: t("experience.roasting.desc"),
      img: "/images/product-roasting.jpg",
    },
    {
      title: t("experience.brewing.title"),
      desc: t("experience.brewing.desc"),
      img: "/images/product-brewing.jpg",
    },
    {
      title: t("experience.sourcing.title"),
      desc: t("experience.sourcing.desc"),
      img: "/images/origin-facility.jpg",
    },
  ];

  return (
    <div
      style={{
        background: C.espresso,
        minHeight: "100vh",
        fontFamily: "monospace",
      }}
    >
      {/* =========================================================
     PRELOADER
 ========================================================= */}
      <div
        className="fixed inset-0 z-[200] flex items-center justify-center"
        style={{
          background: C.espresso,
          opacity: loaded ? 0 : 1,
          pointerEvents: loaded ? "none" : "auto",
          transition: "opacity 1s ease-in-out",
        }}
      >
        <style>{`
    /* ── Core reveals ── */
    @keyframes scanDown {
      0%   { transform: translateY(-100vh); opacity: 0.6; }
      100% { transform: translateY(100vh);  opacity: 0; }
    }
    @keyframes blurIn {
      0%   { opacity: 0; filter: blur(24px); letter-spacing: 0.6em; transform: scale(1.08); }
      100% { opacity: 1; filter: blur(0);    letter-spacing: 0.35em; transform: scale(1); }
    }
    @keyframes lineExpand {
      0%   { width: 0;     opacity: 0; }
      100% { width: 140px; opacity: 1; }
    }
    @keyframes fadeUp {
      0%   { opacity: 0; transform: translateY(12px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeDown {
      0%   { opacity: 0; transform: translateY(-12px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    @keyframes popIn {
      0%   { opacity: 0; transform: rotate(45deg) scale(0); }
      70%  { transform: rotate(45deg) scale(1.4); }
      100% { opacity: 1; transform: rotate(45deg) scale(1); }
    }

    /* ── Frame borders draw in ── */
    @keyframes drawRight {
      from { width: 0; }
      to   { width: 56px; }
    }
    @keyframes drawDown {
      from { height: 0; }
      to   { height: 56px; }
    }

    /* ── Ambient + shimmer ── */
    @keyframes glowPulse {
      0%,100% { opacity: 0.5; transform: scale(1); }
      50%     { opacity: 1;   transform: scale(1.12); }
    }
    @keyframes shimmerSweep {
      0%   { background-position: 200% center; }
      100% { background-position: -100% center; }
    }

    /* ── Particles ── */
    @keyframes particle1 { 0%{opacity:0;transform:translate(0,0) scale(0)} 30%{opacity:1} 100%{opacity:0;transform:translate(-60px,-80px) scale(1.5)} }
    @keyframes particle2 { 0%{opacity:0;transform:translate(0,0) scale(0)} 30%{opacity:1} 100%{opacity:0;transform:translate(70px,-60px) scale(1.2)} }
    @keyframes particle3 { 0%{opacity:0;transform:translate(0,0) scale(0)} 30%{opacity:1} 100%{opacity:0;transform:translate(-80px,50px) scale(1)} }
    @keyframes particle4 { 0%{opacity:0;transform:translate(0,0) scale(0)} 30%{opacity:1} 100%{opacity:0;transform:translate(90px,70px) scale(1.3)} }
    @keyframes particle5 { 0%{opacity:0;transform:translate(0,0) scale(0)} 30%{opacity:1} 100%{opacity:0;transform:translate(40px,-100px) scale(1)} }
    @keyframes particle6 { 0%{opacity:0;transform:translate(0,0) scale(0)} 30%{opacity:1} 100%{opacity:0;transform:translate(-100px,20px) scale(1.4)} }
    @keyframes particle7 { 0%{opacity:0;transform:translate(0,0) scale(0)} 30%{opacity:1} 100%{opacity:0;transform:translate(55px,90px) scale(1.1)} }
    @keyframes particle8 { 0%{opacity:0;transform:translate(0,0) scale(0)} 30%{opacity:1} 100%{opacity:0;transform:translate(-45px,-90px) scale(1.3)} }

    /* ── Rotating ring ── */
    @keyframes spinRing {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }
    @keyframes ringFadeIn {
      0%   { opacity: 0; transform: scale(0.5); }
      100% { opacity: 1; transform: scale(1); }
    }

    /* ── Horizontal scan line ── */
    @keyframes hScan {
      0%   { transform: translateX(-110%); opacity: 0.8; }
      100% { transform: translateX(110%);  opacity: 0; }
    }

    /* ── Counter line ── */
    @keyframes progressBar {
      0%   { width: 0%; }
      100% { width: 100%; }
    }

    /* ── Dot loader ── */
    @keyframes dotBounce {
      0%,100% { transform: scaleY(0.4); opacity: 0.3; }
      50%     { transform: scaleY(1.2); opacity: 1; }
    }
  `}</style>

        {/* ── Ambient radial glow ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 55% 45% at 50% 50%, ${C.bronze}22 0%, transparent 70%)`,
            animation: "glowPulse 2s ease-in-out infinite",
          }}
        />

        {/* ── Horizontal scan line sweep ── */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ zIndex: 1 }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `linear-gradient(90deg, transparent 0%, ${C.bronze}18 50%, transparent 100%)`,
              animation: "hScan 0.9s cubic-bezier(0.4,0,0.2,1) 0.1s both",
            }}
          />
        </div>

        {/* ── Corner ornaments ── */}
        {[
          { top: 24, left: 24 },
          { top: 24, right: 24 },
          { bottom: 24, left: 24 },
          { bottom: 24, right: 24 },
        ].map((pos, i) => {
          const isRight = "right" in pos;
          const isBottom = "bottom" in pos;
          return (
            <div
              key={i}
              className="absolute pointer-events-none"
              style={{ ...pos, width: 56, height: 56 }}
            >
              <div
                style={{
                  position: "absolute",
                  [isBottom ? "bottom" : "top"]: 0,
                  [isRight ? "right" : "left"]: 0,
                  height: 1,
                  background: C.bronze,
                  opacity: 0.7,
                  animation: `drawRight 0.4s ease-out ${0.15 + i * 0.07}s both`,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  [isBottom ? "bottom" : "top"]: 0,
                  [isRight ? "right" : "left"]: 0,
                  width: 1,
                  background: C.bronze,
                  opacity: 0.7,
                  animation: `drawDown 0.4s ease-out ${0.2 + i * 0.07}s both`,
                }}
              />
            </div>
          );
        })}

        {/* ── Spinning dashed ring ── */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: 220,
            height: 220,
            borderRadius: "50%",
            border: `1px dashed ${C.bronze}44`,
            animation:
              "ringFadeIn 0.5s ease-out 0.3s both, spinRing 8s linear 0.3s infinite",
          }}
        />
        {/* Inner solid ring */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: 180,
            height: 180,
            borderRadius: "50%",
            border: `1px solid ${C.bronze}22`,
            animation:
              "ringFadeIn 0.5s ease-out 0.45s both, spinRing 5s linear reverse 0.45s infinite",
          }}
        />

        {/* ── Center content ── */}
        <div className="text-center relative" style={{ zIndex: 2 }}>
          {/* Eyebrow */}
          <div
            style={{
              color: C.bronze,
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 10,
              letterSpacing: "0.55em",
              textTransform: "uppercase",
              opacity: 0,
              animation: "fadeDown 0.5s ease-out 0.25s forwards",
              marginBottom: 16,
            }}
          >
            {t("preloader.since")}
          </div>

          {/* Main title — blur-in */}
          <div
            style={{
              color: C.bone,
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(2.2rem, 6vw, 3.8rem)",
              fontWeight: 300,
              position: "relative",
              opacity: 0,
              animation: "blurIn 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s forwards",
            }}
          >
            {t("nav.brand")}
            {/* Shimmer overlay */}
            <span
              style={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(105deg, transparent 30%, ${C.bone}70 50%, transparent 70%)`,
                backgroundSize: "200% 100%",
                animation: "shimmerSweep 0.9s ease-in-out 0.9s both",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                pointerEvents: "none",
              }}
            />
          </div>

          {/* Divider + diamond */}
          <div
            className="relative flex items-center justify-center"
            style={{ margin: "18px 0" }}
          >
            <div
              style={{
                height: 1,
                background: `linear-gradient(90deg, transparent, ${C.bronze}, transparent)`,
                opacity: 0,
                animation:
                  "lineExpand 0.5s cubic-bezier(0.16,1,0.3,1) 0.85s forwards",
              }}
            />
            <div
              style={{
                position: "absolute",
                width: 7,
                height: 7,
                background: C.bronze,
                opacity: 0,
                animation: "popIn 0.4s ease-out 1.1s forwards",
              }}
            />
          </div>

          {/* Tagline */}
          <div
            style={{
              color: C.bronze,
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 10,
              letterSpacing: "0.5em",
              textTransform: "uppercase",
              opacity: 0,
              animation: "fadeUp 0.5s ease-out 0.95s forwards",
              marginBottom: 28,
            }}
          >
            {t("preloader.tagline")}
          </div>

          {/* Progress bar */}
          <div
            style={{
              width: 120,
              height: 1,
              background: `${C.bronze}25`,
              borderRadius: 1,
              margin: "0 auto",
              overflow: "hidden",
              opacity: 0,
              animation: "fadeUp 0.3s ease-out 1s forwards",
            }}
          >
            <div
              style={{
                height: "100%",
                background: `linear-gradient(90deg, ${C.bronze}88, ${C.bronze})`,
                animation:
                  "progressBar 1.6s cubic-bezier(0.4,0,0.2,1) 0.3s both",
              }}
            />
          </div>

          {/* Bar loader */}
          <div
            className="flex items-end justify-center gap-[5px]"
            style={{ marginTop: 14 }}
          >
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                style={{
                  width: 2,
                  height: 12,
                  borderRadius: 2,
                  background: C.bronze,
                  opacity: 0,
                  transformOrigin: "bottom",
                  animation: `fadeUp 0.3s ease-out ${1.1 + i * 0.06}s forwards, dotBounce 0.8s ease-in-out ${1.3 + i * 0.12}s infinite`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
      {/* =========================================================
          NAVIGATION
      ========================================================= */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-10 py-5 flex items-center justify-between transition-all duration-500"
        style={{
          direction: "ltr",
          background: "rgba(26,20,18,0.6)",
          backdropFilter: "blur(20px)",
        }}
      >
        <a
          href="#"
          className="text-lg tracking-[0.2em] font-light"
          style={{
            color: C.bone,
            fontFamily: "'Playfair Display', Georgia, serif",
          }}
        >
          {t("nav.brand")}
        </a>
        <div className="hidden md:flex items-center gap-8">
          {["collections", "process", "experience", "contact"].map((key) => (
            <a
              key={key}
              href={`#${key}`}
              className="relative group"
              style={{
                color: C.taupe,
                fontSize: "11px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {t(`nav.${key}`)}
              <span
                className="absolute bottom-[-4px] left-0 h-[1px] w-0 group-hover:w-full transition-all duration-400"
                style={{ background: C.bronze }}
              />
            </a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all hover:bg-white/10"
            style={{
              color: C.taupe,
              fontSize: "11px",
              letterSpacing: "0.05em",
            }}
          >
            <Globe size={12} />
            {lang === "en" ? "AR" : "EN"}
          </button>
        </div>
      </nav>

      {/* =========================================================
          HERO SECTION
      ========================================================= */}
      <section
        ref={heroRef}
        className="relative w-full mt-10"
        style={{ height: "100vh", overflow: "hidden", background: "#0a0704" }}
      >
        {/* ══════════════════════════════════════════
        01 · AMBIENT GRADIENT MESH
        ══════════════════════════════════════════ */}
        <div
          className="absolute inset-0 z-[0]"
          style={{
            background: [
              "radial-gradient(ellipse 70% 60% at 18% 55%, rgba(185,115,38,0.18) 0%, transparent 65%)",
              "radial-gradient(ellipse 45% 55% at  6% 85%, rgba(130,65,22,0.13) 0%, transparent 55%)",
              "radial-gradient(ellipse 35% 45% at 28% 12%, rgba(210,140,55,0.09) 0%, transparent 50%)",
              "#0a0704",
            ].join(", "),
            animation: "heroMesh 12s ease-in-out infinite",
          }}
        />

        {/* ══════════════════════════════════════════
        02 · RIGHT PANEL — Hero photograph
        ══════════════════════════════════════════ */}
        <div
          className="himg absolute inset-y-0 right-0 z-[1]"
          style={{ width: "55%" }}
        >
          <img
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1600&q=88"
            alt={t("hero.imgAlt")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center 42%",
              display: "block",
            }}
          />
          {/* Blend into left dark panel */}
          <div
            className="absolute inset-y-0 left-0"
            style={{
              width: 240,
              background:
                "linear-gradient(to right, #0a0704 0%, rgba(10,7,4,.55) 55%, transparent 100%)",
            }}
          />
          {/* Top + bottom vignette */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,.42) 0%, transparent 22%, transparent 72%, rgba(0,0,0,.6) 100%)",
            }}
          />
        </div>

        {/* ══════════════════════════════════════════
        03 · LEFT PANEL OVERLAY
        ══════════════════════════════════════════ */}
        <div
          className="absolute inset-y-0 left-0 z-[2]"
          style={{
            width: "52%",
            background: "rgba(10,7,4,0.72)",
          }}
        />

        {/* ══════════════════════════════════════════
        04 · FILM GRAIN
        ══════════════════════════════════════════ */}
        <div
          className="absolute inset-0 z-[3] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
            opacity: 0.038,
            mixBlendMode: "overlay",
          }}
        />

        {/* ══════════════════════════════════════════
        05 · LEFT BRONZE ACCENT LINE
        ══════════════════════════════════════════ */}
        <div
          className="hacc absolute left-0 top-0 z-10"
          style={{
            width: 2.5,
            height: "100%",
            background: `linear-gradient(to bottom, transparent 4%, ${C.bronze} 22%, ${C.bronze} 78%, transparent 96%)`,
            opacity: 0.65,
          }}
        />

        {/* ══════════════════════════════════════════
        06 · ROTATING BADGE  (top-right)
        ══════════════════════════════════════════ */}
        <div
          className="hi7 absolute z-20 hidden md:flex items-center justify-center"
          style={{ top: 30, right: 36, width: 84, height: 84 }}
        >
          <svg
            viewBox="0 0 84 84"
            width="84"
            height="84"
            style={{
              position: "absolute",
              animation: "heroSpin 22s linear infinite",
            }}
          >
            <defs>
              <path
                id="bp2026"
                d="M42,42 m-29,0 a29,29 0 1,1 58,0 a29,29 0 1,1 -58,0"
              />
            </defs>
            <text
              style={{
                color: "wheat",
                fontSize: "7.2px",
                fill: C.taupe,
                letterSpacing: "3.1px",
                fontFamily: "Georgia, serif",
              }}
            >
              <textPath href="#bp2026">{t("hero.badge")}</textPath>
            </text>
          </svg>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: C.bronze,
              boxShadow: `0 0 16px 4px ${C.bronze}55`,
              flexShrink: 0,
            }}
          />
        </div>

        {/* ══════════════════════════════════════════
        07 · MAIN COPY — Left-aligned editorial
        ══════════════════════════════════════════ */}
        <div
          className="absolute inset-0 z-10 flex flex-col justify-center"
          style={{
            paddingLeft: "clamp(28px, 6.5vw, 90px)",
            paddingRight: "52%",
            pointerEvents: "none",
          }}
        >
          {/* Eyebrow */}
          <div
            className="hu1 flex items-center gap-3 mb-7"
            style={{
              color: C.bronze,
              fontSize: "9.5px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              fontFamily: "Cormorant Garamond, Georgia, serif",
            }}
          >
            <span
              style={{
                width: 20,
                height: 1,
                background: C.bronze,
                display: "block",
                flexShrink: 0,
              }}
            />
            {t("hero.eyebrow")}
          </div>

          {/* Headline */}
          <h1 style={{ margin: 0, padding: 0 }}>
            <span
              className="hu2 block"
              style={{
                color: C.bone,
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(40px, 4.4vw, 80px)",
                fontWeight: 200,
                lineHeight: 1.0,
                letterSpacing: "-0.026em",
              }}
            >
              {t("hero.title")}
            </span>

            {/* Outline variant — depth & elegance */}
            <span
              className="hu3 block"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(48px, 7.4vw, 106px)",
                fontWeight: 400,
                lineHeight: 1.0,
                letterSpacing: "-0.026em",
                color: "transparent",
                WebkitTextStroke: `1.2px ${C.bone}`,
                opacity: 0.45,
                marginTop: 5,
              }}
            >
              {t("hero.subtitle")}
            </span>
          </h1>

          {/* Ornament */}
          <div
            className="hu4 flex items-center gap-2.5 mt-8 mb-6"
            style={{ opacity: 0.32 }}
          >
            <span
              style={{
                width: 36,
                height: "0.5px",
                background: C.taupe,
                display: "block",
              }}
            />
            <svg width="4" height="4" viewBox="0 0 4 4">
              <circle cx="2" cy="2" r="2" fill={C.bronze} />
            </svg>
            <span
              style={{
                width: 36,
                height: "0.5px",
                background: C.taupe,
                display: "block",
              }}
            />
          </div>

          {/* Tagline */}
          <p
            className="hu4"
            style={{
              color: C.taupe,
              fontSize: "12.5px",
              letterSpacing: "0.04em",
              lineHeight: 1.95,
              maxWidth: 228,
              fontWeight: 300,
              margin: 0,
              fontFamily: "Cormorant Garamond, Georgia, serif",
            }}
          >
            {t("hero.taglineLine1")}
            <br />
            {t("hero.taglineLine2")}
            <br />
            {t("hero.taglineLine3")}
          </p>

          {/* CTAs */}
          <div
            className="hu5 flex items-center gap-5 mt-10"
            style={{ pointerEvents: "auto" }}
          >
            {/* Primary pill */}
            <a
              href="#collections"
              className="hpill"
              style={{
                background: C.bronze,
                color: C.bone,
                fontSize: "10px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                padding: "13px 26px",
              }}
            >
              {t("hero.cta")}
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path
                  d="M1 6.5h11M7.5 2l4.5 4.5-4.5 4.5"
                  stroke={C.bone}
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>

            {/* Ghost link */}
            <a
              href="#about"
              className="hghost"
              style={{
                color: C.taupe,
                fontSize: "11px",
                letterSpacing: "0.12em",
                borderBottom: `1px solid ${C.taupe}44`,
                paddingBottom: 2,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = C.bone;
                e.currentTarget.style.borderColor = `${C.bone}66`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = C.taupe;
                e.currentTarget.style.borderColor = `${C.taupe}44`;
              }}
            >
              {t("hero.ourStory")}
            </a>
          </div>
        </div>

        {/* ══════════════════════════════════════════
        08 · FLOATING PRODUCT CARD  (on image)
        ══════════════════════════════════════════ */}
        <div
          className="hi8 absolute z-20 hidden lg:block"
          style={{
            right: "5%",
            bottom: "17%",
            animation: "heroFloat 5.5s ease-in-out infinite",
            animationDelay: "1.3s",
          }}
        >
          <div
            style={{
              background: "rgba(12,9,5,0.7)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 20,
              padding: "22px 24px",
              width: 198,
            }}
          >
            {/* Shimmer "New" badge */}
            <span
              className="hshimmer"
              style={{
                display: "inline-block",
                border: `1px solid ${C.bronze}55`,
                borderRadius: 100,
                padding: "3px 11px",
                color: C.bronze,
                fontSize: "8px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                marginBottom: 14,
              }}
            >
              {t("hero.card.badge")}
            </span>

            {/* Name */}
            <div
              style={{
                color: C.bone,
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 21,
                fontWeight: 400,
                lineHeight: 1.18,
                letterSpacing: "-0.01em",
              }}
            >
              {t("hero.card.name1")}
              <br />
              {t("hero.card.name2")}
            </div>

            {/* Tasting notes */}
            <div
              style={{
                color: C.taupe,
                fontSize: "11px",
                letterSpacing: "0.04em",
                lineHeight: 1.8,
                marginTop: 10,
                opacity: 0.8,
                fontFamily: "Cormorant Garamond, Georgia, serif",
                fontWeight: 300,
              }}
            >
              {t("hero.card.notes1")}
              <br />
              {t("hero.card.notes2")}
            </div>

            {/* Hairline */}
            <div
              style={{
                height: "0.5px",
                background: "rgba(255,255,255,0.08)",
                margin: "14px 0",
              }}
            />

            {/* Price + CTA */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  color: C.bone,
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 18,
                  fontWeight: 400,
                }}
              >
                {t("hero.card.price")}
              </span>
              <a
                href="#shop"
                className="hcard-shop"
                style={{
                  color: C.bronze,
                  fontSize: "9px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                {t("hero.card.shop")}
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path
                    d="M1 5h8M5.5 1.5l3.5 3.5-3.5 3.5"
                    stroke={C.bronze}
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════
        09 · BOTTOM GRADIENT + STATS BAR
        ══════════════════════════════════════════ */}
        <div
          className="absolute bottom-0 left-0 right-0 z-[4] pointer-events-none"
          style={{
            height: 170,
            background:
              "linear-gradient(to top, rgba(0,0,0,.78) 0%, transparent 100%)",
          }}
        />

        <div
          className="hi7 absolute bottom-0 left-0 right-0 z-10 flex items-end"
          style={{
            paddingLeft: "clamp(28px, 6.5vw, 90px)",
            paddingRight: 38,
            paddingBottom: 28,
          }}
        >
          {/* Three stats */}
          <div style={{ display: "flex", alignItems: "center" }}></div>

          <div style={{ flex: 1 }} />

          {/* Scroll indicator */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span
              style={{
                color: C.taupe,
                fontSize: "8px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                opacity: 0.4,
              }}
            >
              {t("hero.scroll")}
            </span>
            <div
              style={{
                width: 1,
                height: 38,
                position: "relative",
                overflow: "hidden",
                background: `${C.taupe}1a`,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: 1,
                  background: C.bronze,
                  animation: "heroDrop 2s ease-in-out infinite",
                }}
              />
            </div>
          </div>
        </div>
      </section>
      {/* =========================================================
          FEATURE / ORIGIN SECTION
      ========================================================= */}
      <section
        ref={featureRef}
        id="collections"
        className="relative px-6 sm:px-10 lg:px-20 py-32 sm:py-40"
        style={{ background: C.espresso }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div ref={featureTextRef} className="order-2 lg:order-1">
            <span
              className="feature-text-item block mb-6"
              style={{
                color: C.bronze,
                fontSize: "11px",
                letterSpacing: "0.15em",
              }}
            >
              {t("origin.label")}
            </span>
            <span
              className="feature-text-item block mb-10"
              style={{
                color: C.cacao,
                fontSize: "11px",
                letterSpacing: "0.1em",
              }}
            >
              {t("origin.coords")}
            </span>
            <h2
              className="feature-text-item text-3xl sm:text-4xl lg:text-5xl font-normal mb-8"
              style={{
                color: C.bone,
                fontFamily: "'Playfair Display', Georgia, serif",
                lineHeight: 1.15,
              }}
            >
              {t("origin.title")}
            </h2>
            <p
              className="feature-text-item mb-10 max-w-md"
              style={{
                color: "wheat",
                fontSize: "13px",
                lineHeight: 1.8,
                letterSpacing: "0.02em",
              }}
            >
              {t("origin.body")}
            </p>
            <a
              href="#"
              className="feature-text-item inline-flex items-center gap-2 transition-colors duration-300 group"
              style={{
                color: C.bronze,
                fontSize: "11px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              {t("origin.cta")}
              <ChevronRight
                size={12}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
          </div>
          <div
            className="order-1 lg:order-2"
            style={{ clipPath: "inset(0% round 0vw)" }}
          >
            <div
              ref={featureImgRef}
              className="relative overflow-hidden rounded-sm"
              style={{ aspectRatio: "4/3" }}
            >
              <img
                src="/images/origin-facility.jpg"
                alt={t("origin.imgAlt")}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          PRODUCTS SHOWCASE (Infinite Loop)
      ========================================================= */}
      <section
        className="relative py-2 sm:py-32"
        style={{ background: "rgb(27 18 15)" }}
      >
        <div ref={productsLabelRef} className="text-center mb-16 px-6">
          <span
            className="products-title block mb-4"
            style={{
              color: C.bronze,
              fontSize: "11px",
              letterSpacing: "0.15em",
            }}
          >
            {t("products.label")}
          </span>
          <h2
            className="products-title text-4xl sm:text-5xl lg:text-6xl font-normal mb-4"
            style={{
              color: "whitesmoke",
              fontFamily: "'Playfair Display', Georgia, serif",
            }}
          >
            {t("products.title")}
          </h2>
          <p
            className="products-title"
            style={{
              color: C.cacao,
              fontSize: "13px",
              letterSpacing: "0.05em",
            }}
          >
            {t("products.subtitle")}
          </p>
        </div>
        {/* <InfiniteLoop /> */}
        <div className="max-w-6xl mx-auto px-6 mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-lg cursor-pointer"
              style={{
                background: "#201714",
                border: `1px solid rgba(26,20,18,0.06)`,
              }}
            >
              <div className="overflow-hidden" style={{ aspectRatio: "1" }}>
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <h3
                  style={{
                    color: "wheat",
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "16px",
                    marginBottom: "6px",
                  }}
                >
                  {p.name}
                </h3>
                <p
                  style={{
                    color: "#83775f",
                    fontSize: "11px",
                    letterSpacing: "0.05em",
                    marginBottom: "10px",
                  }}
                >
                  {p.notes}
                </p>
                <div className="flex items-center justify-between">
                  <span
                    style={{
                      color: C.bronze,
                      fontSize: "14px",
                      fontWeight: 500,
                    }}
                  >
                    {p.price}
                  </span>
                  <button
                    className="p-2 rounded-full transition-all duration-300 hover:scale-110"
                    style={{ background: C.espresso }}
                  >
                    <ChevronRight size={14} style={{ color: C.bone }} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================
          EXPERIENCE SECTION
      ========================================================= */}
      <section
        id="process"
        className="relative px-6 sm:px-10 lg:px-20 py-32 sm:py-40"
        style={{ background: C.espresso }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span
              style={{
                color: C.bronze,
                fontSize: "11px",
                letterSpacing: "0.15em",
                display: "block",
                marginBottom: "16px",
              }}
            >
              {t("experience.label")}
            </span>
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-normal"
              style={{
                color: C.bone,
                fontFamily: "'Playfair Display', Georgia, serif",
              }}
            >
              {t("experience.title")}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {experienceItems.map((item, i) => (
              <div
                key={i}
                ref={(el) => {
                  expRefs.current[i] = el;
                }}
                className="group relative overflow-hidden rounded-lg"
                style={{
                  background: "rgba(242,235,229,0.03)",
                  border: "1px solid rgba(242,235,229,0.04)",
                }}
              >
                <div className="overflow-hidden" style={{ aspectRatio: "4/3" }}>
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 sm:p-8">
                  <h3
                    className="text-lg sm:text-xl font-normal mb-3"
                    style={{
                      color: C.bone,
                      fontFamily: "'Playfair Display', Georgia, serif",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      color: C.taupe,
                      fontSize: "12px",
                      lineHeight: 1.75,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          CAFE ATMOSPHERE BANNER
      ========================================================= */}
      <section
        className="relative"
        style={{ height: "60vh", overflow: "hidden" }}
      >
        {/* 1. Cinematic Video Section */}
        <div className="relative w-full h-[400px] md:h-[700px] rounded-3xl overflow-hidden mb-20 flex items-center justify-center group shadow-2xl">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-1000 group-hover:scale-105"
          >
            <source
              src="https://res.cloudinary.com/dfhecwiib/video/upload/v1779599350/dfe34213-7782-4417-b296-223c5ebb276f_1_wweyc6.mp4"
              type="video/mp4"
            />
          </video>

          <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors duration-500 z-10"></div>

          <h2
            className="relative z-20 text-3xl sm:text-4xl lg:text-5xl font-normal max-w-3xl mx-auto leading-snug text-center px-4 drop-shadow-lg"
            style={{
              color: C.bone,
              fontFamily: "'Playfair Display', Georgia, serif",
            }}
          >
            {t("footer.tagline")}
          </h2>
        </div>
      </section>

      {/* =========================================================
          TESTIMONIALS
      ========================================================= */}
      <section
        id="experience"
        className="relative px-6 sm:px-10 lg:px-20 py-32 sm:py-40"
        style={{ background: C.espresso }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span
              style={{
                color: C.bronze,
                fontSize: "11px",
                letterSpacing: "0.15em",
                display: "block",
                marginBottom: "16px",
              }}
            >
              {t("testimonials.label")}
            </span>
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-normal"
              style={{
                color: C.bone,
                fontFamily: "'Playfair Display', Georgia, serif",
              }}
            >
              {t("testimonials.title")}
            </h2>
          </div>
          <div className="testimonials-grid grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((tItem, i) => (
              <div
                key={i}
                className="  duration-300 fade-in-10 cursor-pointer border-yellow-500  testimonial-card relative p-6 sm:p-8 rounded-xl"
                style={{
                  background: "rgba(242,235,229,0.03)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <img
                    src={tItem.img}
                    alt={tItem.name}
                    className="w-12 h-12 rounded-full object-cover"
                    loading="lazy"
                  />
                  <div>
                    <h4
                      style={{
                        color: C.bone,
                        fontSize: "13px",
                        fontWeight: 500,
                      }}
                    >
                      {tItem.name}
                    </h4>
                    <p style={{ color: C.cacao, fontSize: "11px" }}>
                      {tItem.role}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      size={12}
                      fill={C.bronze}
                      style={{ color: C.bronze }}
                    />
                  ))}
                </div>
                <p
                  style={{
                    color: "wheat",
                    fontSize: "12px",
                    lineHeight: 1.75,
                    fontStyle: "italic",
                  }}
                >
                  "{tItem.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          FOOTER
      ========================================================= */}
      <Footer t={t} C={C} />

      {/* =========================================================
          FLOATING WHATSAPP BUTTON
      ========================================================= */}
      <button
        onClick={openWhatsApp}
        className="fixed bottom-6 z-[90] p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
        style={{
          background: "#25D366",

          right: "auto",
          left: "24px",
        }}
        title={t("buttons.whatsapp")}
      >
        <FaWhatsapp size={24} color="white" fill="white" />
      </button>

      {/* =========================================================
          FLOATING AI CHAT BUTTON
      ========================================================= */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 z-[90] p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
        style={{
          background: C.bronze,
          right: "24px",
          left: "auto",
        }}
        title={t("chat.buttonTitle")}
      >
        {chatOpen ?
          <X size={22} color={C.bone} />
        : <Coffee size={22} color={C.bone} />}
      </button>

      <ChatModal
        lang={lang}
        open={chatOpen}
        onClose={() => setChatOpen(false)}
      />

      {/* Global Styles */}
      <style>{`

        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&display=swap');

        @keyframes ha-up {
      from { opacity: 0; transform: translateY(30px); }
      to   { opacity: 1; transform: translateY(0);    }
    }
    @keyframes ha-in {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes ha-reveal {
      from { clip-path: inset(100% 0 0 0); }
      to   { clip-path: inset(0% 0 0 0);   }
    }
    @keyframes ha-spin {
      to { transform: rotate(360deg); }
    }
    @keyframes ha-drop {
      0%   { height: 0;    top: 0;    opacity: 1; }
      60%  { height: 38px; top: 0;    opacity: 1; }
      100% { height: 0;    top: 38px; opacity: 0; }
    }
    @keyframes ha-float {
      0%, 100% { transform: translateY(0px);   }
      50%       { transform: translateY(-6px);  }
    }
    @keyframes ha-shimmer {
      0%   { background-position: -200% center; }
      100% { background-position:  200% center; }
    }
 
 @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Cormorant+Garamond:wght@300;400&display=swap');
 
    /* ── Keyframes ── */
    @keyframes heroUp {
      from { opacity: 0; transform: translateY(36px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes heroIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes heroReveal {
      from { clip-path: inset(0 0 100% 0); }
      to   { clip-path: inset(0 0 0% 0); }
    }
    @keyframes heroSpin {
      to { transform: rotate(360deg); }
    }
    @keyframes heroDrop {
      0%   { height: 0;    top: 0;    opacity: 1; }
      55%  { height: 40px; top: 0;    opacity: 1; }
      100% { height: 0;    top: 40px; opacity: 0; }
    }
    @keyframes heroFloat {
      0%, 100% { transform: translateY(0); }
      50%       { transform: translateY(-8px); }
    }
    @keyframes heroMesh {
      0%, 100% { opacity: 1; transform: scale(1) translate(0, 0); }
      33%       { opacity: .85; transform: scale(1.06) translate(2%, 1%); }
      66%       { opacity: .9;  transform: scale(.97)  translate(-1%, 2%); }
    }
    @keyframes heroShimmer {
      from { background-position: -200% center; }
      to   { background-position:  200% center; }
    }
    @keyframes heroLineExpand {
      from { transform: scaleY(0); }
      to   { transform: scaleY(1); }
    }
 
    /* ── Entrance helpers ── */
    .hu1  { animation: heroUp 1.1s cubic-bezier(.16,1,.3,1) both; animation-delay: .08s; }
    .hu2  { animation: heroUp 1.1s cubic-bezier(.16,1,.3,1) both; animation-delay: .22s; }
    .hu3  { animation: heroUp 1.1s cubic-bezier(.16,1,.3,1) both; animation-delay: .36s; }
    .hu4  { animation: heroUp 1.1s cubic-bezier(.16,1,.3,1) both; animation-delay: .5s;  }
    .hu5  { animation: heroUp 1.1s cubic-bezier(.16,1,.3,1) both; animation-delay: .64s; }
    .hu6  { animation: heroUp 1.1s cubic-bezier(.16,1,.3,1) both; animation-delay: .8s;  }
    .hi7  { animation: heroIn  1s  ease                     both; animation-delay: .98s; }
    .hi8  { animation: heroIn  1s  ease                     both; animation-delay: 1.15s;}
    .himg { animation: heroReveal 1.6s cubic-bezier(.76,0,.24,1) both; animation-delay: .04s; }
    .hacc { animation: heroLineExpand 1.2s cubic-bezier(.77,0,.18,1) both; animation-delay: .1s; transform-origin: top; }
 
    /* ── Interactive ── */
    .hpill {
      display: inline-flex; align-items: center; gap: 10px;
      border-radius: 100px; text-decoration: none;
      transition: transform .28s ease, opacity .28s ease;
      cursor: pointer;
    }
    .hpill:hover  { transform: scale(1.04); opacity: .88; }
    .hpill:active { transform: scale(.96); }
 
    .hghost { transition: color .3s, border-color .3s; text-decoration: none; }
 
    .hcard-shop { transition: opacity .25s; }
    .hcard-shop:hover { opacity: .7; }
 
    .hshimmer {
      background: linear-gradient(90deg,
        rgba(255,255,255,.04) 0%,
        rgba(255,255,255,.13) 50%,
        rgba(255,255,255,.04) 100%);
      background-size: 200% auto;
      animation: heroShimmer 3.2s linear infinite;
    }

        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${C.espresso}; }
        ::-webkit-scrollbar-thumb { background: ${C.umber}; border-radius: 3px; }
        ::selection { background: ${C.bronze}; color: ${C.bone}; }
      `}</style>
    </div>
  );
}
