export default {
  intervalId: null,
  
  // Start auto-refresh
  start: () => {
    if (AutoRefresh.intervalId) {
      clearInterval(AutoRefresh.intervalId);
    }
    
    AutoRefresh.intervalId = setInterval(() => {
      GetLatestData.run();
      GetAllData.run();
      GetStats.run();
      console.log('Refreshed at: ' + new Date().toLocaleTimeString());
    }, 5000); // Refresh every 5 seconds
  },
  
  // Stop auto-refresh
  stop: () => {
    if (AutoRefresh.intervalId) {
      clearInterval(AutoRefresh.intervalId);
      AutoRefresh.intervalId = null;
      showAlert('Auto-refresh stopped', 'info');
    }
  },
  
  // Manual refresh
  refresh: () => {
    GetLatestData.run();
    GetAllData.run();
    GetStats.run();
    showAlert('Data refreshed!', 'success');
  }
}