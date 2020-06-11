$(document).ready(function () {
    loginBody();
    var iUri;
    var iWsServers;
    var iUser;
    var iPassword;
    var iProxy;
    $(document).on("click", "#callBtn", function () {
        var addr = $(`input[id="callAddress"]`).val();
        call(addr);
    });
    $(document).on("click", "#deny", function () {
        $('#income').empty();
        $('#cameraScreen').empty();
    });
    $(document).on("click", "#exit", function () {
        loginBody();
    });
    $(document).on("click", "#saveconfig", function () {
        iUser = $(`input[id="authoruser"]`).val();
        iPassword = $(`input[id="pass"]`).val();
        $(`input[id="rgpass"]`).val(iPassword);
        $(`input[id="rguser"]`).val(iUser);
        $(`input[id="tab-1"]`).prop('checked', true);

    });
    $(document).on("click", "#addBtn", function () {
        
        var name = $(`input[id="name"]`).val();
        var addr = $(`input[id="callAddress"]`).val();
        if (!addr.includes(domain))
        {
            addr = addr + domain;
        }

        $('#contactTable').append(`
                        <tr>
                            <td width="20$" style="vertical-align: middle;">${name}</td>
                            <td width="40%" style="vertical-align: middle;">${addr}</td>
                            <td width="40%">
                                <button name="203" style="padding: 3px 15px;" type="button"
                                    class="btn btn-outline-success" onclick="call('${addr}')">Call</button>
                                <button name="203" style="padding: 3px 15px;" type="button"
                                    class="btn btn-outline-success">Edit</button>
                                <button name="203" style="padding: 3px 15px;" type="button"
                                    class="btn btn-outline-success">Delete</button>
                            </td>
                        </tr>
            `
        )

    });

    
    $(document).on("click", "#registerBtn", function () {
        iUri = $(`input[id="uri"]`).val();
        iWsServers = $(`input[id="wss"]`).val();
        iUser = $(`input[id="authoruser"]`).val();
        iPassword = $(`input[id="pass"]`).val();
        iProxy = $(`input[id="proxy"]`).val();
        var check;
        if ($('#icheck').is(":checked")) {
            setAllCookie(iUri,iWsServers,iPassword,iProxy,iUser);
            console.log('setcookie');
        }
        document.cookie = "user=John; path=/index; expires=Tue, 19 Jan 2038 03:14:07 GMT"
        var a  = getCookie("user");
        console.log(a);
        init(iUri,iWsServers,iPassword,iProxy,iUser);
    });
    function setCookie(name, value, days) {
        var expires = "";
        if (days) {
          var date = new Date();
          date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
          expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + value + ((expires==null) ? "" : ";expires=" + expires)

      }
      function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') c = c.substring(1, c.length);
          if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
      }
    function setAllCookie(iUri,iWsServers,iPassword,iProxy,iUser)
    {
        setCookie('URI',iUri,3);
        setCookie('WSS',iWsServers,3);
        setCookie('PASS',iPassword,3);
        setCookie('PROXY',iProxy,3);
        setCookie('USER',iUser,3);
    }
    
})  

function loginBody()
{
    $('#body').empty();
    $('#body').append(`
    <audio id="remoteAudio"></audio>
	<audio id="loaclAudio" muted="muted"></audio>
	<div class="login-wrap">
		<div class="login-html">
			<input id="tab-1" type="radio" name="tab" class="sign-in" checked='true'><label for="tab-1"
				class="tab">Register</label>
			<input id="tab-2" type="radio" name="tab" class="sign-up"><label for="tab-2" class="tab">Configure</label>
			<div class="login-form">
				<div class="sign-in-htm">
					<div class="group">
						<label for="rguser" class="label">Username</label>
						<input id="rguser" type="text" class="input" value="203">
					</div>
					<div class="group">
						<label for="rgpass" class="label">Password</label>
						<input id="rgpass" type="password" class="input" data-type="password" value="TEL4VN.COM@2020">
					</div>
					<div class="group">
						<input id="icheck" type="checkbox" class="check" checked>
						<label for="icheck"><span class="icon"></span> Keep me register</label>

					</div>
					<div class="group">
						<input type="submit" id='registerBtn' class="button" value="Register">
					</div>
				</div>
				<div class="sign-up-htm">
					<div class="group">
						<label for="uri" class="label">SIP URI</label>
						<input id="uri" type="text" class="input" value="203@tel4vn-vn01.tel4vn.com">
					</div>
					<div class="group">
						<label for="pass" class="label">Password</label>
						<input id="pass" type="password" class="input" data-type="password" value="TEL4VN.COM@2020">
					</div>
					<div class="group">
						<label for="wss" class="label">Websocket URI</label>
						<input id="wss" class="input" value="wss://sbc03.tel4vn.com:7444">
					</div>
					<div class="group">
						<label for="proxy" class="label">Proxy</label>
						<input id="proxy"class="input" value="sbc03.tel4vn.com">
					</div>
					<div class="group">
						<label for="authoruser" class="label">Authorization User</label>
						<input id="authoruser" type="text" class="input" value="203">
					</div>
					<div class="group">
						<input id='saveconfig' type="submit" class="button" value="Save">
					</div>
				</div>
			</div>
		</div>
	</div>`);
    
	
}