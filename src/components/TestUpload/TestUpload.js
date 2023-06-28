export default function Upload() {
    const handleSubmit = async (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        console.log('Uploaded successfully!');
      } else {
        console.error('Upload failed');
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input type="file" name="file" />
        <button type="submit">Upload
        </button>
        </form>
    );
    }
    