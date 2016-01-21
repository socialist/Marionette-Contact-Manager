<form>
    <div class="form-group">
        <label for="contact-firstName" class="control-label">First name:</label>
        <input id="contact-firstName" class="form-control" name="firstName" type="text" value="<%- firstName %>"/>
    </div>
    <div class="form-group">
        <label for="contact-lastName" class="control-label">Last name:</label>
        <input id="contact-lastName" class="form-control" name="lastName" type="text" value="<%- lastName %>"/>
    </div>
    <div class="form-group">
        <label for="contact-phoneNumber" class="control-label">Phone number:</label>
        <input id="contact-phoneNumber" class="form-control" name="phoneNumber" type="text" value="<%- phoneNumber %>"/>
    </div>
    <button class="btn js-submit">Save</button>
</form>