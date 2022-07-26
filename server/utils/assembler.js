exports.getChat = (bodyObj) =>{
    console.log('<assembler> Creating a chat from Body');
    let chat = {
        number: bodyObj.number,
        title: bodyObj.title,
        agent: bodyObj.agent,
        caseType: bodyObj.caseType,
        descriptions: bodyObj.descriptions
    };
    //optionals: 
    if(bodyObj.macros && bodyObj.macros.length>0){chat.macros= bodyObj.macros; }
    if(bodyObj.links && bodyObj.links.length>0){chat.links= bodyObj.links; }
    if(bodyObj.slackThread){chat.slackThread= bodyObj.slackThread; }
    if(bodyObj.jiraTicket){chat.jiraTicket= bodyObj.jiraTicket; }
    return chat;
}

exports.getChatUpd = (bodyObj) =>{
    console.log('<assembler> Creating $set query from Body');
    let newvalues = {   
        $set: {     
            number: bodyObj.number,
            title: bodyObj.title,
            agent: bodyObj.agent,  
            caseType: bodyObj.caseType,
            descriptions: bodyObj.descriptions,
            macros: bodyObj.macros?bodyObj.macros:[],
            links: bodyObj.links?bodyObj.links:[],
            jiraTicket:  bodyObj.jiraTicket?bodyObj.jiraTicket:'',
            slackThread: bodyObj.slackThread?bodyObj.slackThread:''
        }, 
       };
    return newvalues;
}


/*exports.mergeBlog = (newBlog, model) =>{     //prepareModelForUpdate
    const updates = Object.keys(newBlog);//obtiene atributos
    updates.forEach(field => {
        model[field] = newBlog[field];
    })
    return model;
}*/