/*
gtool-script alpha
Copyright (C) mr_chainman (techspider) 2018.
Licensed under GNU GPLv3

This file includes the base types for GTSC
*/

var GTSCFunction = function(name, cb_exec)
{
    this.name = name;
    this.execute = cb_exec;
}

var GTSCVariable = function(name, data)
{
    this.name = name;
    this.data = data;
}

var GTSCContext = function()
{
    this.variables = [];
    this.functions = {};
    this.includes = [];
    this.addVariable = function(varName, varData)
    {
        this.variables.push(new GTSCVariable(varName, varData));
    }
    this.getVariable = function(varName)
    {
        for(var i=0; i < this.variables.length; i++)
            if(this.variable[i] != null)
                if(this.variables[i].name == varName)
                    return this.variables[i];
        return null;
    }
}

module.exports = {
    GTSCContext,
    GTSCFunction,
    GTSCVariable
}