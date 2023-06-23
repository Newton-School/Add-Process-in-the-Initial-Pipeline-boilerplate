const { use } = require("chai");
const Process   = require("../models/process.js");
const { string } = require("joi");

const removeProcess = async (req, res) => {

    //firstProcessName is allways a valid process.
    let { firstProcessName, processToRemoveName} = req.body;
    try{
        
        let processToRemove = await Process.find( { name: processToRemoveName } );
        processToRemove = processToRemove[0];
        if(!processToRemove)
        {
            res.status(404).json({
                status: 'fail',
                message: 'Process not found in initial Pipeline'
            });
        }
        const firstProcess   = await Process.find( { name: firstProcessName } );
        const firstProcessId = firstProcess[0]._id;
        let allProcess = [], indexOfProcessToRemove, pipelineCost = 0, curProcessId;
        curProcessId = firstProcessId;
        while(curProcessId)
        {
            if(String(curProcessId) == String(processToRemove._id)) 
            indexOfProcessToRemove = allProcess.length;
            const curProcess = await Process.findById(curProcessId);
            pipelineCost += curProcess.cost;
            allProcess.push(curProcess);
            curProcessId = curProcess.nextProcess;
        }
        pipelineCost -= (allProcess[indexOfProcessToRemove]).cost;
        if(indexOfProcessToRemove) {
            await Process.findByIdAndUpdate( allProcess[indexOfProcessToRemove-1]._id, {
                nextProcess : allProcess[indexOfProcessToRemove].nextProcess
            });
        }
        else {
            firstProcessName = allProcess[indexOfProcessToRemove+1].name;
        }
        await Process.findByIdAndDelete(processToRemove._id);

        res.status(200).json({
            status: 'success',
            message: 'Process Removed',
            pipelineCost,
            firstProcessName
        });
    }catch(err){
        
        // console.log(err.message);
        res.status(500).json({
            status: 'fail',
            message: 'Something went wrong'
        });
    }
}

const addProcess = async (req, res) => {

    //firstProcessName is allways a valid process.
    let { firstProcessName, processBeforeName, processToBeAddedName, processToBeAddedCost} = req.body;
    try{
        //Write your code here.
    }catch(err){
        
        console.log(err.message);
        res.status(500).json({
            status: 'fail',
            message: 'Something went wrong'
        });
    }
}

module.exports = { removeProcess, addProcess };
