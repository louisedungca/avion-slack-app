export function errors(error) {
  let errorMessage = '';

  if (error) {
    console.error('Error Status:', error.status);
    console.error('Error Message:', error.message);

    if (error.status === 404) {
      errorMessage = "This page doesn't exist.";
    } else if (error.status === 401) {
      errorMessage = "Invalid username or password.";
    } else if (error.status === 422) {
      errorMessage = "Account exists. Choose another email to create a new account.";
    } else if (error.status === 503) {
      errorMessage = "Looks like our system is down.";
    } else if (error.status === 418) {
      errorMessage = "🫖";
    }
  } else {
    errorMessage = error.message || error.statusText || "Something went wrong";
  }
    
};