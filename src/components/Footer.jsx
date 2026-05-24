import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
  Circle,
  Tooltip,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import L from "leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import { Coffee, Phone, Mail, MapPin } from "lucide-react";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function Footer({ t, C }) {
  // طنطا - غيّرها لموقع الكافيه الحقيقي
  const position = [30.7865, 31.0004];

  const cafeName = t("footer.cafeName") || "قهوة المنشاوي";

  return (
    <footer
      id="contact"
      className="relative overflow-hidden pt-20 pb-8"
      style={{ background: C.espresso }}
    >
      {/* Background Glow */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at top right, rgba(196,143,92,0.18), transparent 35%)",
        }}
      />

      <div className="max-w-[90rem] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        {/* Top Section */}
        <div className="grid lg:grid-cols-[1.35fr_0.9fr] gap-6 mb-16">
          {/* Map Card */}
          <div
            className="rounded-[2rem] border backdrop-blur-xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.03)",
              borderColor: "rgba(242,235,229,0.08)",
              boxShadow: "0 20px 80px rgba(0,0,0,0.35)",
            }}
          >
            {/* Header */}
            <div className="p-5 sm:p-6 flex items-center justify-between gap-4 flex-wrap">
              <div>
                <h3
                  className="text-xl sm:text-2xl font-light"
                  style={{
                    color: C.bone,
                    fontFamily: "'Playfair Display', Georgia, serif",
                  }}
                >
                  {t("footer.findUs") || "مكاننا على الخريطة"}
                </h3>

                <p className="mt-2 text-sm" style={{ color: C.cacao }}>
                  {t("footer.location") || "طنطا، الغربية، مصر"}
                </p>
              </div>

              <div
                className="px-4 py-2 rounded-full text-xs tracking-wide"
                style={{
                  background: "rgba(196,143,92,0.12)",
                  border: "1px solid rgba(196,143,92,0.18)",
                  color: "wheat",
                }}
              >
                {t("footer.premiumExperience") || "تجربة قهوة بريميوم"}
              </div>
            </div>

            {/* Map */}
            <div
              className="overflow-hidden"
              onWheel={(e) => e.stopPropagation()}
            >
              <div className="h-[320px] sm:h-[400px] lg:h-[460px] w-full">
                <MapContainer
                  center={position}
                  zoom={15}
                  scrollWheelZoom="center"
                  zoomControl={false}
                  className="h-full w-full z-0"
                >
                  <ZoomControl position="bottomright" />

                  <TileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />

                  <Circle
                    center={position}
                    radius={500}
                    pathOptions={{
                      color: "#C48F5C",
                      fillColor: "#C48F5C",
                      fillOpacity: 0.12,
                      weight: 2,
                    }}
                  />

                  <Marker position={position}>
                    <Popup>
                      <div className="text-sm font-medium">
                        {cafeName}
                        <br />
                        {t("footer.country") || "مصر"}
                      </div>
                    </Popup>

                    <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                      {cafeName}
                    </Tooltip>
                  </Marker>
                </MapContainer>
              </div>
            </div>
          </div>

          {/* Side Cards */}
          <div className="grid gap-5">
            {/* Experience Card */}
            <div
              className="rounded-[2rem] p-6 backdrop-blur-xl"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(242,235,229,0.08)",
                boxShadow: "0 20px 80px rgba(0,0,0,0.25)",
              }}
            >
              <h4
                className="mb-6 text-lg"
                style={{
                  color: "wheat",
                  fontFamily: "'Playfair Display', Georgia, serif",
                }}
              >
                {t("footer.experience") || "تجربة القهوة"}
              </h4>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center"
                    style={{
                      background: "rgba(196,143,92,0.12)",
                    }}
                  >
                    <Coffee className="w-5 h-5" style={{ color: C.latte }} />
                  </div>

                  <div>
                    <div className="font-medium" style={{ color: C.bone }}>
                      {t("footer.freshBeans") || "حبوب محمصة طازجة"}
                    </div>

                    <div className="text-sm mt-1" style={{ color: C.cacao }}>
                      {t("footer.freshBeansDesc") ||
                        "قهوة بجودة بريميوم بتحضر يوميًا"}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center"
                    style={{
                      background: "rgba(196,143,92,0.12)",
                    }}
                  >
                    <MapPin className="w-5 h-5" style={{ color: C.latte }} />
                  </div>

                  <div>
                    <div className="font-medium" style={{ color: C.bone }}>
                      {t("footer.primeLocation") || "موقع مميز"}
                    </div>

                    <div className="text-sm mt-1" style={{ color: C.cacao }}>
                      {t("footer.primeLocationDesc") ||
                        "سهولة الوصول في قلب طنطا"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Card */}
            <div
              className="rounded-[2rem] p-6 backdrop-blur-xl"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(242,235,229,0.08)",
                boxShadow: "0 20px 80px rgba(0,0,0,0.25)",
              }}
            >
              <h4
                className="mb-6 text-lg"
                style={{
                  color: C.latte,
                  fontFamily: "'Playfair Display', Georgia, serif",
                }}
              >
                {t("footer.contact") || "تواصل سريع"}
              </h4>

              <div className="space-y-4">
                <a
                  href="tel:+201001234567"
                  className="flex items-center gap-4 transition-opacity duration-300 hover:opacity-100 opacity-80"
                  style={{ color: C.bone }}
                >
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">+20 1080761700</span>
                </a>

                <a
                  href="mailto:shadatucme@gmail.com"
                  className="flex items-center gap-4 transition-opacity duration-300 hover:opacity-100 opacity-80"
                  style={{ color: C.bone }}
                >
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">shadatucme@gmail.com</span>
                </a>

                <div
                  className="flex items-center gap-4 opacity-80"
                  style={{ color: C.bone }}
                >
                  <MapPin className="w-4 h-4" />

                  <span className="text-sm">
                    {t("footer.location") || "طنطا، الغربية، مصر"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
          style={{
            borderTop: `1px solid rgba(242,235,229,0.08)`,
          }}
        >
          <span
            style={{
              color: C.cacao,
              fontSize: "12px",
              letterSpacing: "0.05em",
            }}
          >
            &copy; {new Date().getFullYear()}{" "}
            {t("footer.rights") || "قهوة المنشاوي. جميع الحقوق محفوظة."} |{" "}
            {t("footer.builtBy") || "تم التطوير بواسطة"} Ibrahim Abu Zeid
          </span>

          <span
            className="text-3xl tracking-[0.25em] font-light cursor-default transition-opacity duration-500 hover:opacity-100"
            style={{
              color: C.bone,
              fontFamily: "'Playfair Display', Georgia, serif",
              opacity: 0.4,
            }}
          >
            {t("footer.brand") || "المنشاوي"}
          </span>
        </div>
      </div>
    </footer>
  );
}
