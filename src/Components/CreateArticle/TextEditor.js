import { Editor } from '@tinymce/tinymce-react';
import React from 'react';

const TextEditor = (props) => {
   const {bodyTextEdit, editorRef, token} = props

   return (
      <Editor
         apiKey='xvykg1jsmhicv8cl0x99z2mu1xajt5b6eogxfod1j3b8hdot'
         onInit={(evt, editor) => editorRef.current = editor}
         initialValue={bodyTextEdit && bodyTextEdit}
         init={{
         id: '#editor',
         height: 400,
         menubar: true,
         plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
         ],
         toolbar: 'undo redo | formatselect | bold italic underline | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media | code preview' ,
         content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
         automatic_uploads: true,
         images_upload_url: 'http://localhost:3000/upload/postImage',
         images_upload_handler: function(blobInfo, success, failure) {
               let headers = new Headers()
               headers.append('Accept', 'Application/JSON')
               headers.append('authorization', token)

               let formData = new FormData()
               formData.append('file', blobInfo.blob(), blobInfo.filename())

               let req = new Request('https://my-blog-article.herokuapp.com/upload/postImage', {
                  method: 'POST',
                  headers,
                  mode: 'cors',
                  body: formData
               })

               fetch(req)
               .then(res => res.json())
               .then(result => success(result.postImgUrl.secure_url))
               .catch(() => failure('HTTP Error'))
            }
         }}
      />
   );
};

export default TextEditor;