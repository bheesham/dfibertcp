<div style="text-align: center; margin: 0px; padding: 0px;">
	<h1 id="login-header">Login</h1>
	<div id="login-form">
		<form action="index.php/Login/submit" method="post">
			<?php echo validation_errors(); ?>
			<?php if ( isset( $error ) ) { echo '<p class="error">' . $error . '</p>'; } ?>
			<?php if ( isset( $success ) ) { echo '<p class="success">' . $success . '</p>'; } ?>
			<p>
				<label for="username">Username:</label><input type="text" class="text" name="username" id="username" value="<?php echo set_value('username'); ?>" /><br />
				<label for="password">Password:</label><input type="password" class="text" name="password" id="password" value="" /><br /><br />
				<input type="submit" name="submit" class="button" value="Login" />
			</p>
		</form>
	</div>
</div>