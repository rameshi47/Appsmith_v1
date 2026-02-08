export default {
	tabDefault: async () => {
	await storeValue('default_tab',['Report'])
},

	userNameFromId: (ID) => {
		return getUsers.data.find(user => user.ID == ID).Name
	},
	onClick: () => {
		resetWidget('Modal1');
		showModal('Modal1');
	},
	
	selectEmployee: async () => {
		await getTimeLogs.run();
		await storeValue('default_tab',appsmith.store.default_tab.concat('Time Log'));
		await resetWidget('lst_user')
	},
	
	saveTimeLog: async () => {
		if(!Select1.selectedOptionValue){
			showAlert('Select a task','error');
			return false
		}else{
			await addTimeLog.run()
			await getTimeLogs.run();
			resetWidget('Modal1');
			closeModal('Modal1');
			return addTimeLog.responseMeta
		}
	},

	clockout: async () => {
		await clockout.run();
		await getTimeLogs.run()
	},

	diffHrsMins: (timeStart, timeEnd) => {
		let diff = moment(timeEnd || moment()).diff(timeStart,'minutes');
		let hours = Math.floor(diff/60);
		let minutes = '0'.concat(diff % 60).toString().slice(-2);
		let duration = `${hours}:${minutes}`;
		return duration
	},

	joinData: (data1= getTimeLogs.data, data1fk='user_id', data2=getUsers.data, data2pk='id') => {
		let joinedData = data1, data2Label = data1fk + '_Obj'
		joinedData.forEach(d1 => {
			d1[data2Label] = data2?.find(d2 => d2[data2pk] == d1[data1fk])
		});
		return joinedData
	},

	timeDisplay: (timeStart, timeEnd) => {
		timeEnd = moment(timeEnd).isValid() ?  moment(timeEnd).format('MM-DD-YYYY HH:mm a') : 'ACTIVE';
		return moment(timeStart).format('MM-DD-YYYY HH:mm a') + `
` + timeEnd
	},
	
	totalsChart: () => {
		let totals = {};
		getAllTimeLogs.data.map(log=>{
			let duration = moment(log?.time_end || moment()).diff(log.time_start,'hours');
			totals[log.task]=duration + (totals[log?.task] || 0)
		});
		return Object.keys(totals).map(key=>({x:key,y:totals[key]}))
	}
}