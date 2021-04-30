import React, { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import { Button, Slider, Typography } from '@material-ui/core'
import getCroppedImg from './cropImage'
import useStyles from './styles'
import { getCookie } from '../SignupAndSignin/Signin/SigninHelper'
import ProfileHandler from '../ContextProvider/Handler/ProfileHandler'


const ImageCropper = ({image}) => {
  const classes = useStyles();
  const {uploadProfile} = ProfileHandler()

  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        image,
        croppedAreaPixels,
        rotation
      )
      uploadProfile(croppedImage)
    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels, rotation])


  return (
    <div>
      <div className={classes.cropContainer}>
        <Cropper
          image={image}
          crop={crop}
          rotation={rotation}
          zoom={zoom}
          aspect={4 / 4}
          onCropChange={setCrop}
          onRotationChange={setRotation}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      <div className={classes.controls}>
        <div className={classes.sliderContainer}>
          <Typography
            variant="overline"
            className={classes.sliderLabel}
          >
            Zoom
          </Typography>
          <Slider
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            className={classes.slider}
            onChange={(e, zoom) => setZoom(zoom)}
          />
        </div>
        <div className={classes.sliderContainer}>
          <Typography
            variant="overline"
            className={classes.sliderLabel}
          >
            Rotation
          </Typography>
          <Slider
            value={rotation}
            min={0}
            max={360}
            step={1}
            aria-labelledby="Rotation"
            className={classes.slider}
            onChange={(e, rotation) => setRotation(rotation)}
          />
        </div>
        <div className='text-center'>
          <Button
            onClick={showCroppedImage}
            variant="contained"
            color="primary"
            className={classes.cropButton }
          >
            Crop And Save
          </Button>
        </div>
      </div>
      {/* <ImgDialog img={croppedImage} onClose={onClose} /> */}
    </div>
  )
}

export default ImageCropper;
