var isRegisted = false;
var simple = null;
function init() {
    
    var iUri = $(`input[id="uriAddr"]`).val();
    var iWsServers = $(`input[id="wsServers"]`).val();
    var iPort = $(`input[id="port"]`).val();
    var iUSer = $(`input[id="authorUser"]`).val();
    var iPassword = $(`input[id="password"]`).val();
    var iProxy = $(`input[id="proxy"]`).val();
    if (!iWsServers.includes("wss://"))
    {
        iWsServers = "wss://"+iWsServers;
    }
    var options = {
        media: {
            local: {
                audio: document.getElementById('localAudio')
            },
            remote: {
                audio: document.getElementById('remoteAudio')
            }
        },
        ua:
        {
            uri: iUri,
            wsServers: iWsServers+":" + iPort,
            password: iPassword,
            authorizationUser:iUSer,
            proxy : iProxy
        }
    };
    simple = new SIP.Web.Simple(options);
    addEvent(simple);
}
function addComponent()
{
    $("#income").append(`
        <div class="col-md-2">
                            <button id='accept'  onclick="answer()"
                                class="btn btn-outline-info btn-rounded btn-block z-depth-0">Answer</button>
                        </div>
                        <div class="col-md-2">
                            <button id='deny' onclick="reject()"
                                class="btn btn-outline-info btn-rounded btn-block z-depth-0">Deny</button>
                        </div>
                        <div class="col-md-2">
                            <button id='hangup' onclick="hangup()"
                                class="btn btn-outline-info btn-rounded btn-block z-depth-0">Hangup</button>
                        </div>
                        <div class="col-md-2">
                            <button id='mute' onclick="mute()"
                                class="btn btn-outline-info btn-rounded btn-block z-depth-0">Mute</button>
                        </div>
                        <div class="col-md-2">
                            <button id='unmute' onclick="unmute()"
                                class="btn btn-outline-info btn-rounded btn-block z-depth-0">Unmute</button>
                        </div>
                        <div class="col-md-2">
                            <button id='hold'
                                class="btn btn-outline-info btn-rounded btn-block z-depth-0">Hold</button>
                        </div>`
                        );
        $('#cameraScreen').append(`
        <div class="col-xl-12 col-md-12 mb-4">
                        <div class="card border-3 shadow" 
                            style="display: flex;align-content: center;justify-items: center;align-items: center;margin: auto;border-radius:1rem">
                            <img src="loading.gif" height="640px" width="480px" class="card-img-top">
                        </div>
                    </div>
        `);      
                      
}

function addEvent(connection)
{
    connection.on('registered',function(event) {
    isRegisted = true;
    tata.success('Success', 'Register success', { position: 'ml', animate: 'slide', duration: 1500 })
    })
    connection.on('unregistered',function(event) {
        console.log('EVENT : UNREG')
        if (isRegisted==false) {tata.error('Failed', 'Incorrect infomation', { position: 'ml', animate: 'slide', duration: 1500 })}
        else {tata.error('Failed', 'Other reasons', { position: 'ml', animate: 'slide', duration: 1500 })};
    })
    connection.on('ringing',function(event) {
        console.log('EVENT : RINGING')
        addComponent();
          
    })
    connection.on('connecting',function(event) {
        console.log('EVENT : CONNECTING')
    })
    connection.on('connected',function(event) {
        console.log('EVENT : CONNECTING')
    })
    connection.on('ended',function(event) {
        console.log('EVENT : END')
        $('#income').empty();
        $('#cameraScreen').empty();

    })
    connection.on('mute',function(event) {
        console.log('EVENT : MUTE')
    })
    connection.on('unmute',function(event) {
        console.log('EVENT : UNMUTE')
    })
}


function call(addr)
{
    if (!isRegisted)
    {
        tata.error('Failed', 'Please register', { position: 'ml', animate: 'slide', duration: 1500 })
    }
    addComponent();
    simple.call(addr);
}
function answer()
{
    simple.answer();
}
function reject()
{
    simple.reject();
}
function mute()
{
    simple.mute();
}
function unmute()
{
    simple.unmute();
}
function hangup()
{
    simple.hangup();
}
function hold()
{
    simple.hold();
}