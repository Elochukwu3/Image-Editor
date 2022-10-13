const fileInput = document.querySelector(".file-input");
const filterOptions = document.querySelectorAll(".filter button");
const rotateOptions = document.querySelectorAll(".rotate button");
const previewImg = document.querySelector(".preview-img img");
const filterName = document.querySelector(".filter-info .name");
const filterSlider = document.querySelector(".slider input");
const filterValue = document.querySelector(".slider .value");
const resetFilterBtn = document.querySelector(".reset-filter");
const chooseImgBtn = document.querySelector(".choose-img");
const saveImgBtn = document.querySelector(".save-img");

//by default these will be the value of filter button
let brightness = 100,
  saturation = 100,
  inversion = 0,
  grayscale = 0;

let rotate = 0,
  flipHorizontal = 1,
  flipVertical = 1;

//the filter function
const applyFilter = () => {
  previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical}`;
  previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;  
};

const loadImage = () => {
  let file = fileInput.files[0]; //getting user selected image file
  if (!file) return; //return if user hasn't selected any item
  previewImg.src = URL.createObjectURL(file);
  //   console.log(file);
  previewImg.addEventListener("load", () => {
    document.querySelector(".container").classList.remove("disable");
  });
};

filterOptions.forEach((option) => {
  option.addEventListener("click", () => {
    //adding click event listener to all filter button
    document.querySelector(".filter .active").classList.remove("active");
    option.classList.add("active"); //selecting and removing from btn and adding to current clicked button
    filterName.innerText = option.innerText;

    //given the filter buttons max length
    //setting the default value to correspond with the filter value when filter button is clicked
    if (option.id === "brightness") {
      filterSlider.max = "200";
      filterSlider.value = brightness;
      filterValue.innerText = `${brightness}%`;
    } else if (option.id === "saturation") {
      filterSlider.max = "200";
      filterSlider.value = saturation;
      filterValue.innerText = `${saturation}%`;
    } else if (option.id === "inversion") {
      filterSlider.max = "100";
      filterSlider.value = inversion;
      filterValue.innerText = `${inversion}%`;
    } else {
      filterSlider.max = "100";
      filterSlider.value = grayscale;
      filterValue.innerText = `${grayscale}%`;
    }
  });
});

const updateFilter = () => {
  filterValue.innerText = `${filterSlider.value}%`;
  const selectedFilter = document.querySelector(".filter .active");

  if (selectedFilter.id === "brightness") {
    //if selected filter brightness pass the slider value to brightness value
    brightness = filterSlider.value;
  } else if (selectedFilter.id === "saturation") {
    saturation = filterSlider.value;
  } else if (selectedFilter.id === "inversion") {
    inversion = filterSlider.value;
  } else {
    grayscale = filterSlider.value;
  }

  applyFilter();
};

rotateOptions.forEach((option) => {
  option.addEventListener("click", () => {
    //adding click event listener to all rotate button
    if (option.id === "left") {
      //if clicked btn is left, decrement rotate value by -90
      rotate -= 90;
    } else if (option.id === "right") {
      //if clicked btn is left, increment rotate value by +90
      rotate += 90;
    } else if (option.id === "vertical") {
      //if flipVertical.value is 1, set this value to -1 else set 1
      flipVertical = flipVertical === 1 ? -1 : 1;
    } else {
      //if flipHorizontal.value is 1, set this value to -1 else set 1
      flipHorizontal = flipHorizontal === 1 ? -1 : 1;
    }

    applyFilter();
    // console.log(option);
  });
});

const resetFilter = () => {
  // resetting all variable to its default value
  (brightness = 100), (saturation = 100), (inversion = 0), (grayscale = 0);

  (rotate = 0), (flipHorizontal = 1), (flipVertical = 1);

  filterOptions[0].click()// clicking brightness btn, so the brightness selected by default

  applyFilter();
};

const saveImage = () => {
  const canvas = document.createElement("canvas") // creating canvas element
  const ctx = canvas.getContext
  console.log(ctx);
}

fileInput.addEventListener("change", loadImage);
filterSlider.addEventListener("input", updateFilter);
resetFilterBtn.addEventListener("click", resetFilter);
saveImgBtn.addEventListener("click", saveImage);
chooseImgBtn.addEventListener("click", () => fileInput.click());
