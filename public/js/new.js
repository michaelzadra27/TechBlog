const newFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.getElementById('titleEl').value.trim();
    const body = document.getElementById('bodyEl').value.trim();
    
  
    if (title && body) {
      const response = await fetch(`/api/post`, {
        method: 'POST',
        body: JSON.stringify({ title, body }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
        
      } else {
        alert('Failed to create project');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
        console.log("switching")
      } else {
        alert('Failed to delete project');
      }
    }
  };
  
  document
    .querySelector("#new-post-form")
    .addEventListener("submit", newFormHandler);