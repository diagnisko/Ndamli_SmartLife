export default function StatCard({ title, value, color }) {
  return (
    <div className={`p-4 rounded-xl shadow bg-white border-l-4 ${color}`}>
      <h3 className="text-gray-500">{title}</h3>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}