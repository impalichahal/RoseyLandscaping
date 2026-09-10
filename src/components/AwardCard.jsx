export default function AwardCard({ award }) {
  return (
    <div className="rounded-[22px] border border-[#e7e7e7] bg-white p-6 text-center shadow-[0_12px_30px_rgba(0,0,0,0.04)]">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#edf3ee] text-lg font-bold text-[#2e7d32]">
        {award.logo}
      </div>
      <h3 className="mt-5 text-xl font-semibold text-[#222222]">{award.name}</h3>
      <p className="mt-2 text-sm uppercase tracking-[0.2em] text-[#666]">{award.year}</p>
    </div>
  )
}
