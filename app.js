const preview = `<h2>Image Editor</h2>
<div class="wrapper">
  <div class="editor-panel">
    <div class="filter">
      <label class="title">Filters</label>
      <div class="options">
        <button id="brightness" class="active">Brightness</button>
        <button id="saturation">Saturation</button>
        <button id="inversion">Inversion</button>
        <button id="grayscale">Grayscale</button>
      </div>
      <div class="slider">
        <div class="filter-info">
          <p class="name">Brightness</p>
          <p class="value">100%</p>
        </div>
        <input type="range" value="100" min="0" max="200" />
      </div>
    </div>
    <div class="rotate">
      <label class="title">Rotate & Flip</label>
      <div class="options">
        <button id="left"><i class="fa-solid fa-rotate-left"></i></button>
        <button id="right"><i class="fa-solid fa-rotate-right"></i></button>
        <button id="vetical"><i class="fa-solid fa-group-arrows-rotate"></i></button>
        <button id="horizontal"><i class="fa-solid fa-group-arrows-rotate"></i></button>
      </div>
    </div>
  </div>
  <div class="preview-img">
      <img src="image-placeholder.svg" alt="">
  </div>
</div>
<div class="controls">
  <button class="reset-filter">Reset Filters</button>
  <div class="row">
      <input type="file" class="file-input" accept="image/*" hidden>
      <button class="choose-img">Choose Image</button>
      <button class="save-img">Save Image</button>

  </div>
</div>`;
const conatiner = document.querySelector(".container");
conatiner.innerHTML = preview;
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
  previewImg.style.transform = `rotateZ(${rotate}deg) scale(${flipHorizontal}, ${flipVertical}`;
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
  if (selectedFilter.id === "brightness") brightness = filterSlider.value;
  //if selected filter brightness pass the slider value to brightness value

  if (selectedFilter.id === "saturation") saturation = filterSlider.value;

  if (selectedFilter.id === "inversion") inversion = filterSlider.value;

  if (selectedFilter.id === "grayscale") grayscale = filterSlider.value;
  applyFilter();
};

rotateOptions.forEach((option) => {
  option.addEventListener("click", () => {
    //adding click event listener to all rotate button
    rotate -= option.id === "left" && 90;
    //if clicked btn is left, decrement rotate value by -90

    rotate += option.id === "right" && 90;
    //if clicked btn is left, increment rotate value by +90
    if (option.id === "vertical") {
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

  filterOptions[0].click(); // clicking brightness btn, so the brightness selected by default

  applyFilter();
};

const saveImage = () => {
  const canvas = document.createElement("canvas"); // creating canvas element
  const ctx = canvas.getContext;
  console.log(ctx);
};

fileInput.addEventListener("change", loadImage);
filterSlider.addEventListener("input", updateFilter);
resetFilterBtn.addEventListener("click", resetFilter);
saveImgBtn.addEventListener("click", saveImage);
chooseImgBtn.addEventListener("click", () => fileInput.click());
