# TennisScout AI - Plataforma de Reclutamiento para Tenistas

## 🎯 Descripción
Prototipo funcional de una plataforma de reclutamiento que conecta tenistas con academias mediante análisis de IA.

## 📁 Estructura del Proyecto

```
tennisscout-ai/
│
├── public/
│   └── index.html
│
├── src/
│   ├── App.jsx                    # Componente principal
│   ├── index.js                   # Punto de entrada
│   ├── index.css                  # Estilos globales
│   │
│   ├── components/
│   │   ├── Sidebar.jsx            # Navegación lateral
│   │   ├── Header.jsx             # Cabecera con datos del jugador
│   │   ├── RadarChart.jsx         # Gráfico de radar interactivo
│   │   ├── MetricsCards.jsx       # Tarjetas de métricas
│   │   ├── VideoPlayer.jsx        # Reproductor con AI Tags
│   │   ├── ComparativeTable.jsx   # Tabla comparativa
│   │   └── ActionButtons.jsx      # Botones de acción
│   │
│   └── data/
│       └── playerData.js          # Datos del jugador
│
├── package.json
├── tailwind.config.js
└── README.md
```

## 🚀 Instalación y Configuración

### Paso 1: Crear el proyecto
```bash
npx create-react-app tennisscout-ai
cd tennisscout-ai
```

### Paso 2: Instalar dependencias
```bash
npm install recharts lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Paso 3: Copiar archivos
Copia todos los archivos que te proporcionaré en las carpetas correspondientes.

### Paso 4: Ejecutar
```bash
npm start
```

## 🎨 Características

- ✅ Dashboard del Jugador con métricas en tiempo real
- ✅ Gráfico de Radar interactivo (Power, Consistency, Footwork, Mentality)
- ✅ Reproductor de Video con AI Tags
- ✅ Tabla Comparativa vs Promedio de Categoría
- ✅ Navegación lateral funcional
- ✅ Diseño 100% Responsivo (Desktop y Mobile)
- ✅ Exportación a PDF
- ✅ Contacto con Academias

## 🛠️ Tecnologías

- React 18
- Tailwind CSS
- Recharts (gráficos)
- Lucide React (iconos)

## 📱 Secciones

1. **Perfil** - Vista general del jugador
2. **Análisis de IA** - Métricas y video con tags
3. **Torneos** - Historial y próximos eventos
