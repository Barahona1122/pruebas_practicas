<section>
  <fieldset class="captchaField">
    <span id="SuccessMessage" class="success">Correcto</span>
    <input type="text" id="UserCaptchaCode" class="CaptchaTxtField" placeholder='Ingresar Captcha'>
    <span id="WrongCaptchaError" class="error"></span>
    <div class='CaptchaWrap'>
      <div id="CaptchaImageCode" class="CaptchaTxtField">
        <canvas id="CapCode" class="capcode" width="300" height="80"></canvas>
      </div> 
      <input type="button" class="BtnReloadCaptcha">
    </div>
  </fieldset>
</section>