var isRegisted = false;
var domain = "@tel4vn-vn01.tel4vn.com";
var simple = null;
var user;
var uri;
var onring = false;
function init(iUri, iWsServers, iPassword, iProxy, iUSer) {
    user = iUSer;
    uri = iUri;
    if (!iWsServers.includes("wss://")) {
        iWsServers = "wss://" + iWsServers;
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
            wsServers: iWsServers,
            password: iPassword,
            authorizationUser: iUSer,
            proxy: iProxy
        }
    };
    simple = new SIP.Web.Simple(options);
    tata.info('Waiting', 'Waiting for registration', { position: 'mt', animate: 'slide', duration: 3000 })
    addEvent(simple);
}
function addComponent() {
    $("#income").append(`
                        <div class="col-md-6">
                            <button id='accept'  onclick="answer()"
                                class="btn btn-outline-info btn-rounded btn-block z-depth-0">Answer</button>
                        </div>
                        <div class="col-md-6">
                            <button id='deny' onclick="reject()"
                                class="btn btn-outline-info btn-rounded btn-block z-depth-0">Deny</button>
                        </div>`
    );
    $('#cameraScreen').append(`
        <div class="col-xl-12 col-md-12 mb-4">
                        <div class="card border-3 shadow" 
                            style="display: flex;align-content: center;justify-items: center;align-items: center;margin: auto;border-radius:1rem">
                            <img src="loading.gif" height="320px" width="240px" class="card-img-top">
                        </div>
                    </div>
        `);

}

function addEvent(connection) {
    connection.on('registered', function (event) {
        isRegisted = true;
        indexBody(user, uri);
        tata.success('Success', 'Register success', { position: 'ml', animate: 'slide', duration: 1500 })
    })
    connection.on('unregistered', function (event) {
        console.log('EVENT : UNREG')
        if (isRegisted == false) { tata.error('Failed', 'Incorrect infomation', { position: 'ml', animate: 'slide', duration: 1500 }) }
        else { tata.error('Failed', 'Other reasons', { position: 'ml', animate: 'slide', duration: 1500 }) };
    })
    connection.on('ringing', function (event) {
        if (onring == false) {
            addComponent();
        }
        onring = true;
        console.log('EVENT : RINGING')

    })
    connection.on('connecting', function (event) {
        console.log('EVENT : CONNECTING')
    })
    connection.on('rejected', function (response, cause) {
        console.log('EVENT : REJECTED');
    })
    connection.on('accepted', function (data) {
        console.log('EVENT : accepted')
    })

    connection.on('connected', function (event) {
        console.log('EVENT : Connected')
        incall();
    })
    connection.on('ended', function (event) {
        console.log('EVENT : END')
        $('#income').empty();
        $('#cameraScreen').empty();
        onring = false;

    })
    connection.on('mute', function (event) {
        console.log('EVENT : MUTE')
    })
    connection.on('unmute', function (event) {
        console.log('EVENT : UNMUTE')
    })
}
function call(addr) {
    if (!isRegisted) {
        tata.error('Failed', 'Please register', { position: 'ml', animate: 'slide', duration: 1500 })
    }
    if (addr.includes(domain)) { simple.call(addr) }
    else {
        simple.call(addr + domain);
    }
    addComponent();
    incall();
    console.log(addr);
}
function answer() {
    simple.answer();
}
function reject() {
    console.log('reject');
    simple.reject();
}
function mute() {
    simple.mute();
}
function unmute() {
    simple.unmute();
}
function hangup() {
    simple.hangup();
}
function hold() {
    simple.hold();
}
function indexBody(user, uri) {
    $('#body').empty();
    $('#body').append(`
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Tel4vn</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavDropdown">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <a class="nav-link" href="#">${user}<span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">${uri}</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#" id='exit'>Exit</a>
      </li>
    </ul>
  </div>
</nav>
    <audio id="remoteAudio"></audio>
<audio id="loaclAudio" muted="muted"></audio>
<div id='main' class="row" style="margin: 10px 50px;">
<div class="col-xl-6 col-md-6 mb-6">
    <div class="row">

        <div class="card border-3 shadow" style="margin-right: 75px;
border-radius: 1rem;
width: -webkit-fill-available;">
            <div style="padding: 10px 50px;">
                <table class="table">
                    <thead class="black white-text">
                        <tr>
                            <th width="20%" scope="col">Name</th>
                            <th width="40%" scope="col">Phone</th>
                            <th width="40%" scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody id='contactTable'>
                        <tr>
                            <td width="20$" style="vertical-align: middle;">202</td>
                            <td width="40%" style="vertical-align: middle;">202@tel4vn-vn01.tel4vn.com</td>
                            <td width="40%">
                                <button name="203" style="padding: 3px 15px;" type="button"
                                    class="btn btn-outline-success" onclick="call('202')">Call</button>
                                <button name="203" style="padding: 3px 15px;" type="button"
                                    class="btn btn-outline-success">Edit</button>
                                <button name="203" style="padding: 3px 15px;" type="button"
                                    class="btn btn-outline-success">Delete</button>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
<!-- Call -->
<div class="col-xl-6 col-md-6 mb-6">
    <div class="card border-3 shadow" style="border-radius:1rem">

        <h2 style="margin: 10px;text-align: center;">Make a call</h2>
        <div style="padding: 10px 50px;">
            <div class="row">
                <div class="col-md-4" style="display: flex;">
                    <input id='name' type="text" placeholder="Name" class="form-control" value="202">
                </div>
                <div class="col-md-6" style="display: flex;">
                    <input id='callAddress' type="text" placeholder="Address to call" class="form-control"
                        value="202@tel4vn-vn01.tel4vn.com">
                </div>
                <div class="col-md-1">
                    <button id='callBtn'
                        class="btn btn-outline-info btn-rounded btn-block z-depth-0">Call</button>
                </div>
                <div class="col-md-1">
                    <button id='addBtn'
                        class="btn btn-outline-info btn-rounded btn-block z-depth-0">Add</button>
                </div>
            </div>
            <!--  -->

            <!-- Camera Screen -->
            <div id='cameraScreen' class="row">

            </div>
            <div id='income' class="row">

            </div>
        </div>
    </div>
</div>
</div>
<div id="domain">
<p>
    <bold>Contact domain : @tel4vn-vn01.tel4vn.com</bold>
</p>
</div>
    `);
}

function incall()
{
    $("#income").empty();
    $("#income").append(`
                        <div class="col-md-3">
                            <button id='hangup' onclick="hangup()"
                                class="btn btn-outline-info btn-rounded btn-block z-depth-0">Hangup</button>
                        </div>
                        <div class="col-md-3">
                            <button id='mute' onclick="mute()"
                                class="btn btn-outline-info btn-rounded btn-block z-depth-0">Mute</button>
                        </div>
                        <div class="col-md-3">
                            <button id='unmute' onclick="unmute()"
                                class="btn btn-outline-info btn-rounded btn-block z-depth-0">Unmute</button>
                        </div>
                        <div class="col-md-3">
                            <button id='hold'
                                class="btn btn-outline-info btn-rounded btn-block z-depth-0">Hold</button>
                        </div>`
    );
}