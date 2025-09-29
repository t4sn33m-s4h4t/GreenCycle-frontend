
function Dashboard() {
  return (
    <div className="flex flex-1"> 
      <main className="flex-1 p-6 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>
        <p>Charts and analytics data go here...</p>
      </main>
 
      <aside className="w-80 bg-white border-l p-6 hidden lg:block">
        <h2 className="text-lg font-semibold mb-4">Audience</h2>
        <p>Stats, widgets, or extra info here...</p>
      </aside>
    </div>
  );
}

export default Dashboard;
