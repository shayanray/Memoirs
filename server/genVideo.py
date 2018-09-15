# pip install pytransloadit
from transloadit import client

tl = client.Transloadit('c7ea5390b89911e88f2b2764a1e9b394', '74e92d9ab83c3ad481096671cc325850ce15962d')
assembly = tl.new_assembly()

# Add instructions, e.g. resize image, or encode video
assembly.add_step(':original', {
  'robot': '/upload/handle'
})
assembly.add_step('imported_image', {
  'robot': '/http/import',
  'url': 'http://demos.transloadit.com/inputs/chameleon.jpg'
})
assembly.add_step('resized_image', {
  'use': ['imported_image'],
  'robot': '/image/resize',
  'result': true,
  'height': 768,
  'imagemagick_stack': 'v2.0.3',
  'resize_strategy': 'fit',
  'width': 1024,
  'zoom': false
})
assembly.add_step('merged', {
  'use': {'steps':[{'name':':original','as':'audio'},{'name':'resized_image','as':'image'}]},
  'robot': '/video/merge',
  'result': true,
  'ffmpeg_stack': 'v3.3.3',
  'preset': 'ipad-high',
  'resize_strategy': 'pad'
})
assembly.add_step('exported', {
  'use': ['imported_image','resized_image','merged',':original'],
  'robot': '/s3/store',
  'credentials': 'demo_s3_credentials'
})

# Add files to upload
assembly.add_file(open('./joakim_karud-rock_angel.mp3', 'rb'))

# Start the Assembly
assembly_response = assembly.create(retries=5, wait=True)

print(assembly_response.data.get('assembly_id'))

# or
print(assembly_response.data['assembly_id'])