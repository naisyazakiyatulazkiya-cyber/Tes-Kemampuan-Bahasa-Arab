
import React, { useState, useEffect } from 'react';
import { getIndonesianGardens } from '../services/geminiService';

interface ProvinceMarker {
  id: number;
  name: string;
  x: string;
  y: string;
  island: string;
  shortName: string;
}

const GardenMap: React.FC = () => {
  const [data, setData] = useState<{ text: string; links: any[] } | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState<ProvinceMarker | null>(null);

  // Daftar 38 Provinsi Indonesia dengan Koordinat dan Nama
  const markers: ProvinceMarker[] = [
    // Sumatera (10)
    { id: 1, name: 'Aceh', shortName: 'Aceh', x: '8%', y: '15%', island: 'Sumatera' },
    { id: 2, name: 'Sumatera Utara', shortName: 'Sumut', x: '13%', y: '25%', island: 'Sumatera' },
    { id: 3, name: 'Sumatera Barat', shortName: 'Sumbar', x: '16%', y: '35%', island: 'Sumatera' },
    { id: 4, name: 'Riau', shortName: 'Riau', x: '21%', y: '28%', island: 'Sumatera' },
    { id: 5, name: 'Kepulauan Riau', shortName: 'Kepri', x: '28%', y: '22%', island: 'Sumatera' },
    { id: 6, name: 'Jambi', shortName: 'Jambi', x: '24%', y: '38%', island: 'Sumatera' },
    { id: 7, name: 'Sumatera Selatan', shortName: 'Sumsel', x: '27%', y: '45%', island: 'Sumatera' },
    { id: 8, name: 'Bangka Belitung', shortName: 'Babel', x: '33%', y: '40%', island: 'Sumatera' },
    { id: 9, name: 'Bengkulu', shortName: 'Bengkulu', x: '21%', y: '47%', island: 'Sumatera' },
    { id: 10, name: 'Lampung', shortName: 'Lampung', x: '29%', y: '55%', island: 'Sumatera' },

    // Jawa (6)
    { id: 11, name: 'Banten', shortName: 'Banten', x: '32%', y: '68%', island: 'Jawa' },
    { id: 12, name: 'DKI Jakarta', shortName: 'Jakarta', x: '35%', y: '65%', island: 'Jawa' },
    { id: 13, name: 'Jawa Barat', shortName: 'Jabar', x: '36%', y: '72%', island: 'Jawa' },
    { id: 14, name: 'Jawa Tengah', shortName: 'Jateng', x: '42%', y: '75%', island: 'Jawa' },
    { id: 15, name: 'DI Yogyakarta', shortName: 'Jogja', x: '44%', y: '78%', island: 'Jawa' },
    { id: 16, name: 'Jawa Timur', shortName: 'Jatim', x: '49%', y: '77%', island: 'Jawa' },

    // Bali & Nusa Tenggara (3)
    { id: 17, name: 'Bali', shortName: 'Bali', x: '54%', y: '79%', island: 'Bali & NT' },
    { id: 18, name: 'Nusa Tenggara Barat', shortName: 'NTB', x: '59%', y: '80%', island: 'Bali & NT' },
    { id: 19, name: 'Nusa Tenggara Timur', shortName: 'NTT', x: '66%', y: '82%', island: 'Bali & NT' },

    // Kalimantan (5)
    { id: 20, name: 'Kalimantan Barat', shortName: 'Kalbar', x: '42%', y: '25%', island: 'Kalimantan' },
    { id: 21, name: 'Kalimantan Tengah', shortName: 'Kalteng', x: '48%', y: '32%', island: 'Kalimantan' },
    { id: 22, name: 'Kalimantan Selatan', shortName: 'Kalsel', x: '53%', y: '38%', island: 'Kalimantan' },
    { id: 23, name: 'Kalimantan Timur', shortName: 'Kaltim', x: '56%', y: '28%', island: 'Kalimantan' },
    { id: 24, name: 'Kalimantan Utara', shortName: 'Kaltara', x: '54%', y: '16%', island: 'Kalimantan' },

    // Sulawesi (6)
    { id: 25, name: 'Sulawesi Utara', shortName: 'Sulut', x: '73%', y: '20%', island: 'Sulawesi' },
    { id: 26, name: 'Gorontalo', shortName: 'Gorontalo', x: '69%', y: '22%', island: 'Sulawesi' },
    { id: 27, name: 'Sulawesi Tengah', shortName: 'Sulteng', x: '68%', y: '32%', island: 'Sulawesi' },
    { id: 28, name: 'Sulawesi Barat', shortName: 'Sulbar', x: '64%', y: '38%', island: 'Sulawesi' },
    { id: 29, name: 'Sulawesi Selatan', shortName: 'Sulsel', x: '66%', y: '48%', island: 'Sulawesi' },
    { id: 30, name: 'Sulawesi Tenggara', shortName: 'Sultra', x: '72%', y: '45%', island: 'Sulawesi' },

    // Maluku & Papua (8)
    { id: 31, name: 'Maluku Utara', shortName: 'Malut', x: '78%', y: '20%', island: 'Maluku & Papua' },
    { id: 32, name: 'Maluku', shortName: 'Maluku', x: '81%', y: '40%', island: 'Maluku & Papua' },
    { id: 33, name: 'Papua Barat', shortName: 'Pabar', x: '83%', y: '28%', island: 'Maluku & Papua' },
    { id: 34, name: 'Papua Barat Daya', shortName: 'PBD', x: '80%', y: '25%', island: 'Maluku & Papua' },
    { id: 35, name: 'Papua Tengah', shortName: 'Pateng', x: '87%', y: '35%', island: 'Maluku & Papua' },
    { id: 36, name: 'Papua Pegunungan', x: '91%', y: '35%', island: 'Maluku & Papua', shortName: 'Papeg' },
    { id: 37, name: 'Papua Selatan', shortName: 'Pasel', x: '94%', y: '45%', island: 'Maluku & Papua' },
    { id: 38, name: 'Papua', shortName: 'Papua', x: '94%', y: '30%', island: 'Maluku & Papua' },
  ];

  const handleProvinceClick = async (marker: ProvinceMarker) => {
    setSelectedProvince(marker);
    setLoading(true);
    const result = await getIndonesianGardens(marker.name);
    setData(result);
    setLoading(false);
    
    const detailEl = document.getElementById('garden-details');
    if (detailEl) {
      detailEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 pb-32">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-4 tracking-tight leading-tight">
          Nusantara <span className="text-emerald-600">Botanical</span> Map
        </h2>
        <p className="text-gray-500 text-lg max-w-3xl mx-auto font-medium">
          Jelajahi keajaiban sejarah kebun raya nusantara melalui 38 provinsi di Indonesia.
        </p>
      </div>

      {/* NEW: Legend moved above the map to avoid blocking view */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-emerald-100 shadow-sm">
          <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></span>
          <span className="text-[10px] font-black text-emerald-800 uppercase tracking-widest">38 Titik Provinsi</span>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-emerald-100 shadow-sm">
          <span className="text-lg">🖱️</span>
          <span className="text-[10px] font-black text-emerald-800 uppercase tracking-widest">Klik Angka Untuk Info AI</span>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-emerald-100 shadow-sm">
          <span className="text-lg">📍</span>
          <span className="text-[10px] font-black text-emerald-800 uppercase tracking-widest">Integrasi Google Maps</span>
        </div>
      </div>

      {/* Visual Map Container */}
      <div className="relative bg-white rounded-[3.5rem] shadow-[0_32px_64px_-12px_rgba(16,185,129,0.15)] border border-emerald-50 p-6 md:p-12 mb-16 overflow-x-auto no-scrollbar group">
        <div className="relative min-w-[900px] aspect-[2.2/1]">
          {/* Decorative Sea Details */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none overflow-hidden rounded-[3rem]">
            <div className="absolute top-[20%] left-[15%] text-4xl animate-pulse">⛵</div>
            <div className="absolute bottom-[30%] right-[20%] text-5xl animate-bounce" style={{animationDuration: '4s'}}>🐋</div>
            <div className="absolute top-[10%] right-[40%] text-2xl">☁️</div>
            <div className="absolute bottom-[10%] left-[40%] text-3xl">🐬</div>
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#059669 1.5px, transparent 1.5px)', backgroundSize: '40px 40px' }}></div>
          </div>
          
          <svg viewBox="0 0 1000 450" className="w-full h-full drop-shadow-2xl" preserveAspectRatio="xMidYMid meet">
            <defs>
              <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                <feOffset dx="2" dy="4" result="offsetblur" />
                <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <linearGradient id="islandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor:'#f0fdf4', stopOpacity:1}} />
                <stop offset="100%" style={{stopColor:'#dcfce7', stopOpacity:1}} />
              </linearGradient>
            </defs>
            <path d="M40,140 C60,100 120,40 160,50 C200,60 250,150 280,300 C250,340 220,380 180,380 C140,360 80,340 40,300 Z" fill="url(#islandGrad)" stroke="#10b981" strokeWidth="1.5" filter="url(#shadow)" />
            <path d="M300,380 L350,385 C400,390 450,400 550,420 L550,440 L450,430 L350,420 L300,410 Z" fill="url(#islandGrad)" stroke="#10b981" strokeWidth="1.5" filter="url(#shadow)" />
            <path d="M410,120 C430,80 500,70 580,80 C620,90 650,140 650,250 C620,280 550,300 450,300 C420,280 400,200 410,120" fill="url(#islandGrad)" stroke="#10b981" strokeWidth="1.5" filter="url(#shadow)" />
            <path d="M680,120 C700,100 740,90 760,100 C780,110 790,160 780,200 C790,230 760,280 720,280 C700,260 690,200 680,120" fill="url(#islandGrad)" stroke="#10b981" strokeWidth="1.5" filter="url(#shadow)" />
            <path d="M560,425 L580,428 M600,432 L630,438 M650,442 L720,450" stroke="#10b981" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
            <path d="M810,230 C830,210 880,220 920,230 C960,240 980,280 980,340 C970,380 950,420 880,420 C850,400 820,320 810,230" fill="url(#islandGrad)" stroke="#10b981" strokeWidth="1.5" filter="url(#shadow)" />
          </svg>

          {markers.map((marker) => (
            <div
              key={marker.id}
              style={{ left: marker.x, top: marker.y }}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center group/marker"
            >
              <button
                onClick={() => handleProvinceClick(marker)}
                className={`w-7 h-7 md:w-9 md:h-9 rounded-full flex items-center justify-center font-bold text-[10px] md:text-xs transition-all duration-500 shadow-lg ${
                  selectedProvince?.id === marker.id
                    ? 'bg-emerald-600 text-white scale-125 ring-4 ring-emerald-200'
                    : 'bg-white text-emerald-700 hover:bg-emerald-500 hover:text-white border-2 border-emerald-400 group-hover/marker:scale-110'
                }`}
              >
                {marker.id}
              </button>
              <div className={`mt-1.5 px-2 py-0.5 rounded-lg bg-white/90 backdrop-blur-sm border shadow-sm transition-all duration-300 pointer-events-none ${
                selectedProvince?.id === marker.id 
                ? 'border-emerald-500 text-emerald-700 opacity-100 scale-100' 
                : 'border-gray-100 text-gray-500 opacity-0 md:group-hover/marker:opacity-100 scale-90 md:group-hover/marker:scale-100'
              }`}>
                <span className="text-[8px] md:text-[9px] font-black uppercase whitespace-nowrap">{marker.shortName}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Section */}
      <div id="garden-details">
        {!selectedProvince ? (
          <div className="bg-white rounded-[4rem] p-20 text-center shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-50 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-100 via-emerald-500 to-emerald-100"></div>
            <div className="text-8xl mb-8 group-hover:scale-110 transition-transform duration-700">🧭</div>
            <h3 className="text-3xl font-black text-gray-800 mb-4">Siap untuk Menjelajah?</h3>
            <p className="text-gray-500 text-lg max-w-lg mx-auto leading-relaxed">
              Pilih salah satu angka di peta untuk memanggil kecerdasan buatan Botanivers dan melihat rincian kebun raya populer di provinsi tersebut.
            </p>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000">
            <div className="flex flex-col lg:flex-row gap-10">
              <div className="lg:w-2/3">
                <div className="bg-white rounded-[3.5rem] shadow-2xl border border-gray-100 overflow-hidden min-h-[550px] relative">
                  <div className="bg-gradient-to-r from-emerald-600 to-teal-700 px-10 py-12 text-white relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                    <div className="relative z-10 flex justify-between items-end">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <span className="bg-emerald-400/30 backdrop-blur-sm px-4 py-1.5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] border border-white/20">Provinsi #{selectedProvince.id}</span>
                          <span className="bg-white/10 px-4 py-1.5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] border border-white/10">{selectedProvince.island}</span>
                        </div>
                        <h3 className="text-4xl md:text-5xl font-black tracking-tight">{selectedProvince.name}</h3>
                      </div>
                      <div className="hidden md:block text-7xl opacity-20 filter grayscale invert">🇮🇩</div>
                    </div>
                  </div>
                  <div className="p-10 md:p-16">
                    {loading ? (
                      <div className="flex flex-col items-center justify-center py-24">
                        <div className="relative mb-8"><div className="animate-spin rounded-full h-20 w-20 border-[6px] border-emerald-100 border-t-emerald-600"></div><div className="absolute inset-0 flex items-center justify-center text-3xl">📖</div></div>
                        <p className="text-emerald-800 font-bold text-xl text-center">Membuka arsip botani {selectedProvince.name}...</p>
                      </div>
                    ) : (
                      <div className="prose prose-emerald lg:prose-xl max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap font-medium">{data?.text}</div>
                    )}
                  </div>
                </div>
              </div>
              <div className="lg:w-1/3 space-y-8">
                <div className="bg-white rounded-[3rem] p-10 shadow-2xl border border-gray-50 sticky top-24">
                  <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-6">
                    <h4 className="font-black text-gray-900 flex items-center gap-2 text-xl"><span className="text-emerald-500">📍</span> Titik Lokasi</h4>
                  </div>
                  <div className="space-y-4 max-h-[450px] overflow-y-auto pr-3 custom-scrollbar">
                    {!loading && data?.links && data.links.length > 0 ? (
                      data.links.map((chunk: any, i: number) => {
                        const mapInfo = chunk.maps || chunk.web;
                        if (!mapInfo) return null;
                        return (
                          <a key={i} href={mapInfo.uri} target="_blank" rel="noopener noreferrer" className="group flex flex-col p-6 bg-slate-50/50 rounded-[2rem] border-2 border-transparent hover:border-emerald-500 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-emerald-100">
                            <h5 className="font-bold text-gray-800 text-base group-hover:text-emerald-700 transition-colors leading-tight">{mapInfo.title}</h5>
                            <div className="mt-4 flex items-center text-[10px] font-black text-emerald-600 uppercase tracking-widest">Navigasi Sekarang<div className="ml-auto bg-emerald-100 p-2 rounded-xl group-hover:bg-emerald-600 transition-colors"><svg className="w-4 h-4 text-emerald-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg></div></div>
                          </a>
                        );
                      })
                    ) : !loading ? (<div className="text-center py-12 px-6 bg-slate-50 rounded-[2rem] border border-dashed border-slate-200"><p className="text-sm text-slate-400 italic">Link peta langsung tidak ditemukan.</p></div>) : null}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-gray-900 to-emerald-950 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden"><div className="absolute -bottom-10 -right-10 text-[10rem] opacity-5">🌿</div><h4 className="font-black text-xl mb-4 text-emerald-400">Pelestarian Alam</h4><p className="text-gray-300 text-sm leading-relaxed">Kebun raya adalah bank genetik hidup untuk memastikan flora Indonesia tetap terjaga.</p></div>
              </div>
            </div>
          </div>
        )}
      </div>
      <style dangerouslySetInnerHTML={{ __html: `.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; } .custom-scrollbar::-webkit-scrollbar { width: 6px; } .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }`}} />
    </div>
  );
};

export default GardenMap;
