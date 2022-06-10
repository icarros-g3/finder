const getGalleryImagesList = () => {
  const galleryList = document.getElementsByClassName('gallery-image')

  if (!galleryList) {
    return []
  }

  return [...galleryList]
}

const getPreviewImagesList = () => {
  const previewList = document.getElementsByClassName('preview-image')

  if (!previewList) {
    return []
  }

  return [...previewList]
}

const getMaxIndex = array => array.length - 1

const updatePagination = (current, max) => {
  const pagination = document.getElementById('pagination-content')

  pagination.textContent = `${current + 1}/${max + 1}`
}

const handleOnClickPreview = index => {
  const preview = getPreviewImagesList()
  const gallery = getGalleryImagesList()
  const maxIndex = getMaxIndex(gallery)

  const currentImage = gallery.find(image => image.classList.contains('show'))
  const currentPreview = preview.find(image => image.classList.contains('active-preview'))

  currentImage.classList.remove('show')
  currentPreview.classList.remove('active-preview')

  gallery[index].classList.add('show')
  preview[index].classList.add('active-preview')

  updatePagination(index, maxIndex)
}

const forEachPreviewCallback = (image, index) => {
  image.addEventListener('click', () => {
    handleOnClickPreview(index)
  })
}

const addPreviewEventListener = () => {
  const preview = getPreviewImagesList()

  preview.forEach(forEachPreviewCallback)
}

const startCarousel = () => {
  const previousButton = document.getElementById('previous-button')
  const nextButton = document.getElementById('next-button')

  previousButton.addEventListener('click', () => {
    const gallery = getGalleryImagesList()
    const preview = getPreviewImagesList()
    const maxIndex = getMaxIndex(gallery)

    const currentIndex = gallery.findIndex(image => image.classList.contains('show'))
    const newIndex = currentIndex > 0 ? currentIndex - 1 : maxIndex

    gallery[currentIndex].classList.remove('show')
    preview[currentIndex].classList.remove('active-preview')

    gallery[newIndex].classList.add('show')
    preview[newIndex].classList.add('active-preview')

    updatePagination(newIndex, maxIndex)
  })

  nextButton.addEventListener('click', () => {
    const gallery = getGalleryImagesList()
    const preview = getPreviewImagesList()
    const maxIndex = getMaxIndex(gallery)

    const currentIndex = gallery.findIndex(image => image.classList.contains('show'))
    const newIndex = currentIndex < maxIndex ? currentIndex + 1 : 0

    gallery[currentIndex].classList.remove('show')
    preview[currentIndex].classList.remove('active-preview')

    gallery[newIndex].classList.add('show')
    preview[newIndex].classList.add('active-preview')

    updatePagination(newIndex, maxIndex)
  })

  addPreviewEventListener()
}

window.addEventListener('load', startCarousel)