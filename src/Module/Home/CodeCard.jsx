/**
 * Ventana de codigo decorativa del hero.
 *
 * Es imagen, no contenido: el mismo mensaje ya esta en el texto del hero, asi
 * que se oculta a los lectores de pantalla en lugar de obligarles a escuchar
 * comillas y llaves.
 */
const line = "flex flex-wrap gap-x-[0.4ch]";

const CodeCard = () => (
  <div
    aria-hidden="true"
    className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-900/70 shadow-2xl shadow-cyan-500/5 backdrop-blur-sm"
  >
    {/* Barra de titulo */}
    <div className="flex items-center gap-2 border-b border-slate-700/60 bg-slate-800/60 px-4 py-3">
      <span className="h-3 w-3 rounded-full bg-red-400/80" />
      <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
      <span className="h-3 w-3 rounded-full bg-green-400/80" />
      <span className="ml-2 font-mono text-xs text-slate-400">steven.js</span>
    </div>

    <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-7">
      <code className="block text-slate-300">
        <span className={line}>
          <span className="text-purple-400">const</span>
          <span className="text-cyan-300">steven</span>
          <span className="text-slate-500">=</span>
          <span className="text-slate-500">{"{"}</span>
        </span>

        <span className={`${line} pl-4`}>
          <span className="text-sky-300">rol</span>
          <span className="text-slate-500">:</span>
          <span className="text-emerald-300">&quot;Full Stack Developer&quot;</span>
          <span className="text-slate-500">,</span>
        </span>

        <span className={`${line} pl-4`}>
          <span className="text-sky-300">ubicacion</span>
          <span className="text-slate-500">:</span>
          <span className="text-emerald-300">&quot;Costa Rica&quot;</span>
          <span className="text-slate-500">,</span>
        </span>

        <span className={`${line} pl-4`}>
          <span className="text-sky-300">stack</span>
          <span className="text-slate-500">:</span>
          <span className="text-slate-500">[</span>
          <span className="text-emerald-300">&quot;React&quot;</span>
          <span className="text-slate-500">,</span>
          <span className="text-emerald-300">&quot;.NET&quot;</span>
          <span className="text-slate-500">,</span>
          <span className="text-emerald-300">&quot;C#&quot;</span>
          <span className="text-slate-500">],</span>
        </span>

        <span className={`${line} pl-4`}>
          <span className="text-sky-300">estudia</span>
          <span className="text-slate-500">:</span>
          <span className="text-emerald-300">&quot;Ing. en Computación&quot;</span>
          <span className="text-slate-500">,</span>
        </span>

        <span className={`${line} pl-4`}>
          <span className="text-sky-300">disponible</span>
          <span className="text-slate-500">:</span>
          <span className="text-orange-300">true</span>
          <span className="text-slate-500">,</span>
        </span>

        <span className={line}>
          <span className="text-slate-500">{"};"}</span>
          <span className="ml-1 inline-block h-4 w-2 animate-blink bg-cyan-400 align-middle" />
        </span>
      </code>
    </pre>
  </div>
);

export default CodeCard;
