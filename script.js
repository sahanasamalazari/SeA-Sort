// Algorithm data and utilities
const algorithms = {
    bubble: {
        name: 'Bubble Sort',
        icon: '🫧',
        description: 'Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until no swaps are needed, which indicates that the list is sorted.',
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(1)',
        stable: 'Yes',
        inPlace: 'Yes'
    },
    selection: {
        name: 'Selection Sort',
        icon: '🎯',
        description: 'Divides the input list into two parts: a sorted sublist and an unsorted sublist. Initially, the sorted sublist is empty and the unsorted sublist is the entire input list. The algorithm repeatedly finds the smallest element in the unsorted sublist, exchanges it with the leftmost unsorted element, and moves the sublist boundaries one element to the right.',
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(1)',
        stable: 'No',
        inPlace: 'Yes'
    },
    insertion: {
        name: 'Insertion Sort',
        icon: '📝',
        description: 'Builds the final sorted array one item at a time. It works by taking elements from the unsorted portion and inserting them into their correct position in the sorted portion. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort.',
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(1)',
        stable: 'Yes',
        inPlace: 'Yes'
    },
    merge: {
        name: 'Merge Sort',
        icon: '🔀',
        description: 'An efficient, stable, comparison-based, divide and conquer sorting algorithm. It works by dividing the unsorted list into n sublists, each containing one element, then repeatedly merging sublists to produce new sorted sublists until there is only one sublist remaining.',
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(n)',
        stable: 'Yes',
        inPlace: 'No'
    },
    quick: {
        name: 'Quick Sort',
        icon: '⚡',
        description: 'A highly efficient sorting algorithm that uses a divide-and-conquer approach. It works by selecting a \'pivot\' element from the array and partitioning the other elements into two sub-arrays, according to whether they are less than or greater than the pivot.',
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(log n)',
        stable: 'No',
        inPlace: 'Yes'
    },
    heap: {
        name: 'Heap Sort',
        icon: '🏔️',
        description: 'A comparison-based sorting algorithm that uses a binary heap data structure. It divides its input into a sorted and an unsorted region, and it iteratively shrinks the unsorted region by extracting the largest element from it and inserting it into the sorted region.',
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(1)',
        stable: 'No',
        inPlace: 'Yes'
    },
    shell: {
        name: 'Shell Sort',
        icon: '🐚',
        description: 'An in-place comparison sort that generalizes insertion sort to allow the exchange of items that are far apart. It improves on insertion sort by quickly reducing the amount of disorder in the list.',
        timeComplexity: 'O(n^(3/2))',
        spaceComplexity: 'O(1)',
        stable: 'No',
        inPlace: 'Yes'
    },
    counting: {
        name: 'Counting Sort',
        icon: '🔢',
        description: 'A non-comparison integer sorting algorithm that counts the number of objects that have distinct key values, then does some arithmetic to calculate the positions of each key.',
        timeComplexity: 'O(n + k)',
        spaceComplexity: 'O(k)',
        stable: 'Yes',
        inPlace: 'No'
    },
    radix: {
        name: 'Radix Sort',
        icon: '📊',
        description: 'A non-comparative integer sorting algorithm that sorts data with integer keys by grouping keys by the individual digits which share the same significant position and value.',
        timeComplexity: 'O(d * (n + k))',
        spaceComplexity: 'O(n + k)',
        stable: 'Yes',
        inPlace: 'No'
    },
    bucket: {
        name: 'Bucket Sort',
        icon: '🪣',
        description: 'A distribution sort that works by distributing the elements of an array into a number of buckets. Each bucket is then sorted individually, either using a different sorting algorithm, or by recursively applying the bucket sort.',
        timeComplexity: 'O(n + k)',
        spaceComplexity: 'O(n)',
        stable: 'Yes',
        inPlace: 'No'
    }
};

// Global state
let currentArray = [];
let sortingSteps = [];
let currentStep = 0;
let isPlaying = false;
let animationId = null;
let currentAlgorithm = 'bubble';

// Speed settings
const speedSettings = {
    slow: 1000,
    medium: 500,
    fast: 200,
    instant: 0
};

// DOM elements
const welcomePage = document.getElementById('welcome-page');
const selectionPage = document.getElementById('selection-page');
const visualizerPage = document.getElementById('visualizer-page');

// Welcome page elements
const getStartedBtn = document.getElementById('get-started-btn');

// Selection page elements
const backToWelcomeBtn = document.getElementById('back-to-welcome');
const algorithmCards = document.querySelectorAll('.algorithm-card');

// Visualizer page elements
const backToSelectionBtn = document.getElementById('back-to-selection');
const currentAlgorithmBadge = document.getElementById('current-algorithm-badge');
const currentAlgorithmName = document.getElementById('current-algorithm-name');
const algorithmIconLarge = document.getElementById('algorithm-icon-large');
const algorithmName = document.getElementById('algorithm-name');
const algorithmDescription = document.getElementById('algorithm-description');
const timeComplexity = document.getElementById('time-complexity');
const spaceComplexity = document.getElementById('space-complexity');
const stability = document.getElementById('stability');
const inPlace = document.getElementById('in-place');

const arrayContainer = document.getElementById('array-container');
const arraySizeSlider = document.getElementById('array-size');
const arraySizeValue = document.getElementById('array-size-value');
const speedSelect = document.getElementById('speed');
const playPauseBtn = document.getElementById('play-pause');
const stepBtn = document.getElementById('step');
const resetBtn = document.getElementById('reset');
const generateArrayBtn = document.getElementById('generate-array');
const stepDescription = document.getElementById('step-description');
const currentStepNumber = document.getElementById('current-step-number');
const totalSteps = document.getElementById('total-steps');

// Event listeners
getStartedBtn.addEventListener('click', showSelectionPage);
backToWelcomeBtn.addEventListener('click', showWelcomePage);
backToSelectionBtn.addEventListener('click', showSelectionPage);

algorithmCards.forEach(card => {
    card.addEventListener('click', (e) => {
        const algorithm = e.currentTarget.dataset.algorithm;
        currentAlgorithm = algorithm;
        showVisualizerPage();
    });
});

arraySizeSlider.addEventListener('input', handleArraySizeChange);
speedSelect.addEventListener('change', handleSpeedChange);
playPauseBtn.addEventListener('click', togglePlayPause);
stepBtn.addEventListener('click', nextStep);
resetBtn.addEventListener('click', resetVisualization);
generateArrayBtn.addEventListener('click', generateNewArray);

// Page navigation functions
function showWelcomePage() {
    welcomePage.classList.remove('hidden');
    selectionPage.classList.add('hidden');
    visualizerPage.classList.add('hidden');
    resetVisualization();
}

function showSelectionPage() {
    welcomePage.classList.add('hidden');
    selectionPage.classList.remove('hidden');
    visualizerPage.classList.add('hidden');
    resetVisualization();
}

function showVisualizerPage() {
    welcomePage.classList.add('hidden');
    selectionPage.classList.add('hidden');
    visualizerPage.classList.remove('hidden');
    updateAlgorithmInfo();
    generateNewArray();
}

function handleArraySizeChange(e) {
    arraySizeValue.textContent = e.target.value;
    if (!isPlaying) {
        generateNewArray();
    }
}

function handleSpeedChange() {
    // Speed change takes effect immediately
}

function updateAlgorithmInfo() {
    const algo = algorithms[currentAlgorithm];
    currentAlgorithmName.textContent = algo.name;
    algorithmIconLarge.textContent = algo.icon;
    algorithmName.textContent = algo.name;
    algorithmDescription.textContent = algo.description;
    timeComplexity.textContent = algo.timeComplexity;
    spaceComplexity.textContent = algo.spaceComplexity;
    stability.textContent = algo.stable;
    inPlace.textContent = algo.inPlace;
}

function generateNewArray() {
    const size = parseInt(arraySizeSlider.value);
    currentArray = [];
    
    // Generate random array
    for (let i = 0; i < size; i++) {
        currentArray.push(Math.floor(Math.random() * 300) + 10);
    }
    
    renderArray();
    resetVisualization();
}

function renderArray() {
    arrayContainer.innerHTML = '';
    const maxHeight = Math.max(...currentArray);
    const containerWidth = arrayContainer.clientWidth - 40; // Account for padding
    const barWidth = Math.max(8, (containerWidth / currentArray.length) - 2);
    
    currentArray.forEach((value, index) => {
        const bar = document.createElement('div');
        bar.className = 'array-bar';
        bar.style.height = `${(value / maxHeight) * 300}px`;
        bar.style.width = `${barWidth}px`;
        bar.textContent = barWidth > 15 ? value : '';
        bar.dataset.index = index;
        arrayContainer.appendChild(bar);
    });
}

function updateArrayBars(comparing = [], swapping = [], sorted = [], current = [], pivot = []) {
    const bars = document.querySelectorAll('.array-bar');
    
    bars.forEach((bar, index) => {
        // Reset classes
        bar.className = 'array-bar';
        
        // Apply state classes
        if (sorted.includes(index)) {
            bar.classList.add('sorted');
        } else if (swapping.includes(index)) {
            bar.classList.add('swapping');
        } else if (comparing.includes(index)) {
            bar.classList.add('comparing');
        } else if (current.includes(index)) {
            bar.classList.add('current');
        } else if (pivot.includes(index)) {
            bar.classList.add('pivot');
        }
    });
}

function togglePlayPause() {
    if (isPlaying) {
        pauseVisualization();
    } else {
        startVisualization();
    }
}

function startVisualization() {
    if (sortingSteps.length === 0) {
        generateSortingSteps();
    }
    
    isPlaying = true;
    playPauseBtn.textContent = 'Pause';
    playPauseBtn.classList.add('playing');
    stepBtn.disabled = true;
    generateArrayBtn.disabled = true;
    
    playNextStep();
}

function pauseVisualization() {
    isPlaying = false;
    playPauseBtn.textContent = 'Play';
    playPauseBtn.classList.remove('playing');
    stepBtn.disabled = false;
    generateArrayBtn.disabled = false;
    
    if (animationId) {
        clearTimeout(animationId);
    }
}

function resetVisualization() {
    pauseVisualization();
    sortingSteps = [];
    currentStep = 0;
    stepDescription.textContent = 'Click play to start the visualization';
    currentStepNumber.textContent = '0';
    totalSteps.textContent = '0';
    updateArrayBars();
    resetBtn.disabled = false;
}

function nextStep() {
    if (sortingSteps.length === 0) {
        generateSortingSteps();
    }
    
    if (currentStep < sortingSteps.length) {
        executeStep(sortingSteps[currentStep]);
        currentStep++;
        updateStepCounter();
    }
    
    if (currentStep >= sortingSteps.length) {
        stepDescription.textContent = 'Sorting completed!';
        stepBtn.disabled = true;
    }
}

function playNextStep() {
    if (!isPlaying) return;
    
    if (currentStep < sortingSteps.length) {
        executeStep(sortingSteps[currentStep]);
        currentStep++;
        updateStepCounter();
        
        const speed = speedSettings[speedSelect.value];
        if (speed > 0) {
            animationId = setTimeout(playNextStep, speed);
        } else {
            // Instant mode
            while (currentStep < sortingSteps.length && isPlaying) {
                executeStep(sortingSteps[currentStep]);
                currentStep++;
                updateStepCounter();
            }
            if (isPlaying) {
                pauseVisualization();
                stepDescription.textContent = 'Sorting completed!';
            }
        }
    } else {
        pauseVisualization();
        stepDescription.textContent = 'Sorting completed!';
    }
}

function executeStep(step) {
    // Update array if needed
    if (step.array) {
        currentArray = [...step.array];
        renderArray();
    }
    
    // Update visual states
    updateArrayBars(step.comparing, step.swapping, step.sorted, step.current, step.pivot);
    
    // Update description
    stepDescription.textContent = step.explanation;
}

function updateStepCounter() {
    currentStepNumber.textContent = currentStep;
    totalSteps.textContent = sortingSteps.length;
}

function generateSortingSteps() {
    const arrayCopy = [...currentArray];
    sortingSteps = [];
    
    switch (currentAlgorithm) {
        case 'bubble':
            bubbleSort(arrayCopy);
            break;
        case 'selection':
            selectionSort(arrayCopy);
            break;
        case 'insertion':
            insertionSort(arrayCopy);
            break;
        case 'merge':
            mergeSort(arrayCopy);
            break;
        case 'quick':
            quickSort(arrayCopy);
            break;
        case 'heap':
            heapSort(arrayCopy);
            break;
        case 'shell':
            shellSort(arrayCopy);
            break;
        case 'counting':
            countingSort(arrayCopy);
            break;
        case 'radix':
            radixSort(arrayCopy);
            break;
        case 'bucket':
            bucketSort(arrayCopy);
            break;
    }
    
    updateStepCounter();
}

// Sorting algorithm implementations
function bubbleSort(arr) {
    const n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
        let swapped = false;
        
        for (let j = 0; j < n - i - 1; j++) {
            // Comparing elements
            sortingSteps.push({
                array: [...arr],
                comparing: [j, j + 1],
                swapping: [],
                sorted: Array.from({length: i}, (_, k) => n - 1 - k),
                current: [],
                pivot: [],
                explanation: `Comparing elements at positions ${j} and ${j + 1}: ${arr[j]} and ${arr[j + 1]}`
            });
            
            if (arr[j] > arr[j + 1]) {
                // Swapping elements
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
                
                sortingSteps.push({
                    array: [...arr],
                    comparing: [],
                    swapping: [j, j + 1],
                    sorted: Array.from({length: i}, (_, k) => n - 1 - k),
                    current: [],
                    pivot: [],
                    explanation: `Swapped ${arr[j + 1]} and ${arr[j]} because ${arr[j + 1]} > ${arr[j]}`
                });
            }
        }
        
        // Mark the last element as sorted
        sortingSteps.push({
            array: [...arr],
            comparing: [],
            swapping: [],
            sorted: Array.from({length: i + 1}, (_, k) => n - 1 - k),
            current: [],
            pivot: [],
            explanation: `Element at position ${n - 1 - i} is now in its correct position`
        });
        
        if (!swapped) break;
    }
    
    // Mark all elements as sorted
    sortingSteps.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: Array.from({length: n}, (_, k) => k),
        current: [],
        pivot: [],
        explanation: 'Array is now completely sorted!'
    });
}

function selectionSort(arr) {
    const n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        
        // Find minimum element
        for (let j = i + 1; j < n; j++) {
            sortingSteps.push({
                array: [...arr],
                comparing: [j, minIdx],
                swapping: [],
                sorted: Array.from({length: i}, (_, k) => k),
                current: [i],
                pivot: [],
                explanation: `Comparing ${arr[j]} with current minimum ${arr[minIdx]}`
            });
            
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
                sortingSteps.push({
                    array: [...arr],
                    comparing: [],
                    swapping: [],
                    sorted: Array.from({length: i}, (_, k) => k),
                    current: [i, minIdx],
                    pivot: [],
                    explanation: `Found new minimum: ${arr[minIdx]} at position ${minIdx}`
                });
            }
        }
        
        // Swap if needed
        if (minIdx !== i) {
            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
            sortingSteps.push({
                array: [...arr],
                comparing: [],
                swapping: [i, minIdx],
                sorted: Array.from({length: i}, (_, k) => k),
                current: [],
                pivot: [],
                explanation: `Swapped ${arr[i]} with ${arr[minIdx]} to place minimum at position ${i}`
            });
        }
        
        // Mark position as sorted
        sortingSteps.push({
            array: [...arr],
            comparing: [],
            swapping: [],
            sorted: Array.from({length: i + 1}, (_, k) => k),
            current: [],
            pivot: [],
            explanation: `Position ${i} is now sorted with value ${arr[i]}`
        });
    }
    
    // Mark all as sorted
    sortingSteps.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: Array.from({length: n}, (_, k) => k),
        current: [],
        pivot: [],
        explanation: 'Array is now completely sorted!'
    });
}

function insertionSort(arr) {
    const n = arr.length;
    
    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;
        
        sortingSteps.push({
            array: [...arr],
            comparing: [],
            swapping: [],
            sorted: Array.from({length: i}, (_, k) => k),
            current: [i],
            pivot: [],
            explanation: `Taking element ${key} at position ${i} to insert into sorted portion`
        });
        
        while (j >= 0 && arr[j] > key) {
            sortingSteps.push({
                array: [...arr],
                comparing: [j, i],
                swapping: [],
                sorted: [],
                current: [i],
                pivot: [],
                explanation: `Comparing ${arr[j]} with ${key}. Since ${arr[j]} > ${key}, shifting ${arr[j]} to the right`
            });
            
            arr[j + 1] = arr[j];
            j--;
            
            sortingSteps.push({
                array: [...arr],
                comparing: [],
                swapping: [j + 1, j + 2],
                sorted: [],
                current: [i],
                pivot: [],
                explanation: `Shifted ${arr[j + 2]} to position ${j + 2}`
            });
        }
        
        arr[j + 1] = key;
        
        sortingSteps.push({
            array: [...arr],
            comparing: [],
            swapping: [],
            sorted: Array.from({length: i + 1}, (_, k) => k),
            current: [],
            pivot: [],
            explanation: `Inserted ${key} at position ${j + 1}. First ${i + 1} elements are now sorted`
        });
    }
    
    sortingSteps.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: Array.from({length: n}, (_, k) => k),
        current: [],
        pivot: [],
        explanation: 'Array is now completely sorted!'
    });
}

function mergeSort(arr) {
    const n = arr.length;
    
    function merge(arr, left, mid, right) {
        const leftArr = arr.slice(left, mid + 1);
        const rightArr = arr.slice(mid + 1, right + 1);
        
        let i = 0, j = 0, k = left;
        
        while (i < leftArr.length && j < rightArr.length) {
            sortingSteps.push({
                array: [...arr],
                comparing: [left + i, mid + 1 + j],
                swapping: [],
                sorted: [],
                current: Array.from({length: right - left + 1}, (_, idx) => left + idx),
                pivot: [],
                explanation: `Merging: comparing ${leftArr[i]} and ${rightArr[j]}`
            });
            
            if (leftArr[i] <= rightArr[j]) {
                arr[k] = leftArr[i];
                i++;
            } else {
                arr[k] = rightArr[j];
                j++;
            }
            
            sortingSteps.push({
                array: [...arr],
                comparing: [],
                swapping: [k],
                sorted: [],
                current: Array.from({length: right - left + 1}, (_, idx) => left + idx),
                pivot: [],
                explanation: `Placed ${arr[k]} at position ${k}`
            });
            
            k++;
        }
        
        while (i < leftArr.length) {
            arr[k] = leftArr[i];
            sortingSteps.push({
                array: [...arr],
                comparing: [],
                swapping: [k],
                sorted: [],
                current: Array.from({length: right - left + 1}, (_, idx) => left + idx),
                pivot: [],
                explanation: `Copying remaining element ${arr[k]} to position ${k}`
            });
            i++;
            k++;
        }
        
        while (j < rightArr.length) {
            arr[k] = rightArr[j];
            sortingSteps.push({
                array: [...arr],
                comparing: [],
                swapping: [k],
                sorted: [],
                current: Array.from({length: right - left + 1}, (_, idx) => left + idx),
                pivot: [],
                explanation: `Copying remaining element ${arr[k]} to position ${k}`
            });
            j++;
            k++;
        }
        
        sortingSteps.push({
            array: [...arr],
            comparing: [],
            swapping: [],
            sorted: Array.from({length: right - left + 1}, (_, idx) => left + idx),
            current: [],
            pivot: [],
            explanation: `Merged subarray from position ${left} to ${right}`
        });
    }
    
    function mergeSortRecursive(arr, left, right) {
        if (left < right) {
            const mid = Math.floor((left + right) / 2);
            
            sortingSteps.push({
                array: [...arr],
                comparing: [],
                swapping: [],
                sorted: [],
                current: Array.from({length: mid - left + 1}, (_, idx) => left + idx),
                pivot: [],
                explanation: `Dividing array: processing left half from ${left} to ${mid}`
            });
            
            mergeSortRecursive(arr, left, mid);
            
            sortingSteps.push({
                array: [...arr],
                comparing: [],
                swapping: [],
                sorted: [],
                current: Array.from({length: right - mid}, (_, idx) => mid + 1 + idx),
                pivot: [],
                explanation: `Dividing array: processing right half from ${mid + 1} to ${right}`
            });
            
            mergeSortRecursive(arr, mid + 1, right);
            merge(arr, left, mid, right);
        }
    }
    
    mergeSortRecursive(arr, 0, n - 1);
    
    sortingSteps.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: Array.from({length: n}, (_, k) => k),
        current: [],
        pivot: [],
        explanation: 'Merge sort completed! Array is now fully sorted.'
    });
}

function quickSort(arr) {
    const n = arr.length;
    
    function partition(arr, low, high) {
        const pivot = arr[high];
        let i = low - 1;
        
        sortingSteps.push({
            array: [...arr],
            comparing: [],
            swapping: [],
            sorted: [],
            current: [],
            pivot: [high],
            explanation: `Selected pivot: ${pivot} at position ${high}`
        });
        
        for (let j = low; j < high; j++) {
            sortingSteps.push({
                array: [...arr],
                comparing: [j, high],
                swapping: [],
                sorted: [],
                current: [],
                pivot: [high],
                explanation: `Comparing ${arr[j]} with pivot ${pivot}`
            });
            
            if (arr[j] < pivot) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
                
                sortingSteps.push({
                    array: [...arr],
                    comparing: [],
                    swapping: [i, j],
                    sorted: [],
                    current: [],
                    pivot: [high],
                    explanation: `${arr[i]} < ${pivot}, swapped positions ${i} and ${j}`
                });
            }
        }
        
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        
        sortingSteps.push({
            array: [...arr],
            comparing: [],
            swapping: [i + 1, high],
            sorted: [i + 1],
            current: [],
            pivot: [],
            explanation: `Placed pivot ${pivot} at its correct position ${i + 1}`
        });
        
        return i + 1;
    }
    
    function quickSortRecursive(arr, low, high) {
        if (low < high) {
            const pi = partition(arr, low, high);
            
            if (low < pi - 1) {
                sortingSteps.push({
                    array: [...arr],
                    comparing: [],
                    swapping: [],
                    sorted: [pi],
                    current: Array.from({length: pi - low}, (_, idx) => low + idx),
                    pivot: [],
                    explanation: `Sorting left partition from ${low} to ${pi - 1}`
                });
                quickSortRecursive(arr, low, pi - 1);
            }
            
            if (pi + 1 < high) {
                sortingSteps.push({
                    array: [...arr],
                    comparing: [],
                    swapping: [],
                    sorted: [pi],
                    current: Array.from({length: high - pi}, (_, idx) => pi + 1 + idx),
                    pivot: [],
                    explanation: `Sorting right partition from ${pi + 1} to ${high}`
                });
                quickSortRecursive(arr, pi + 1, high);
            }
        }
    }
    
    quickSortRecursive(arr, 0, n - 1);
    
    sortingSteps.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: Array.from({length: n}, (_, k) => k),
        current: [],
        pivot: [],
        explanation: 'Quick sort completed! Array is now fully sorted.'
    });
}

function heapSort(arr) {
    const n = arr.length;
    
    function heapify(arr, n, i) {
        let largest = i;
        let left = 2 * i + 1;
        let right = 2 * i + 2;
        
        if (left < n) {
            sortingSteps.push({
                array: [...arr],
                comparing: [largest, left],
                swapping: [],
                sorted: [],
                current: [i],
                pivot: [],
                explanation: `Comparing parent ${arr[largest]} with left child ${arr[left]}`
            });
            
            if (arr[left] > arr[largest]) {
                largest = left;
            }
        }
        
        if (right < n) {
            sortingSteps.push({
                array: [...arr],
                comparing: [largest, right],
                swapping: [],
                sorted: [],
                current: [i],
                pivot: [],
                explanation: `Comparing current largest ${arr[largest]} with right child ${arr[right]}`
            });
            
            if (arr[right] > arr[largest]) {
                largest = right;
            }
        }
        
        if (largest !== i) {
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            
            sortingSteps.push({
                array: [...arr],
                comparing: [],
                swapping: [i, largest],
                sorted: [],
                current: [],
                pivot: [],
                explanation: `Swapped ${arr[i]} and ${arr[largest]} to maintain heap property`
            });
            
            heapify(arr, n, largest);
        }
    }
    
    // Build max heap
    sortingSteps.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: [],
        current: [],
        pivot: [],
        explanation: 'Building max heap from the array'
    });
    
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }
    
    sortingSteps.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: [],
        current: [],
        pivot: [],
        explanation: 'Max heap built successfully. Now extracting elements one by one.'
    });
    
    // Extract elements from heap
    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        
        sortingSteps.push({
            array: [...arr],
            comparing: [],
            swapping: [0, i],
            sorted: Array.from({length: n - i}, (_, k) => n - 1 - k),
            current: [],
            pivot: [],
            explanation: `Moved largest element ${arr[i]} to position ${i}`
        });
        
        heapify(arr, i, 0);
    }
    
    sortingSteps.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: Array.from({length: n}, (_, k) => k),
        current: [],
        pivot: [],
        explanation: 'Heap sort completed! Array is now fully sorted.'
    });
}

// Shell Sort implementation
function shellSort(arr) {
    const n = arr.length;
    let gap = Math.floor(n / 2);

    while (gap > 0) {
        for (let i = gap; i < n; i++) {
            let temp = arr[i];
            let j = i;

            sortingSteps.push({
                array: [...arr],
                comparing: [j - gap, j],
                swapping: [],
                sorted: [],
                current: [i],
                pivot: [],
                explanation: `Considering element ${temp} at position ${i} with gap ${gap}`
            });

            while (j >= gap && arr[j - gap] > temp) {
                sortingSteps.push({
                    array: [...arr],
                    comparing: [j - gap, j],
                    swapping: [],
                    sorted: [],
                    current: [j],
                    pivot: [],
                    explanation: `Comparing ${arr[j - gap]} and ${temp}, shifting ${arr[j - gap]} to position ${j}`
                });

                arr[j] = arr[j - gap];
                j -= gap;

                sortingSteps.push({
                    array: [...arr],
                    comparing: [],
                    swapping: [j, j + gap],
                    sorted: [],
                    current: [j],
                    pivot: [],
                    explanation: `Shifted ${arr[j]} to position ${j}`
                });
            }

            arr[j] = temp;

            sortingSteps.push({
                array: [...arr],
                comparing: [],
                swapping: [],
                sorted: [],
                current: [j],
                pivot: [],
                explanation: `Inserted ${temp} at position ${j}`
            });
        }
        gap = Math.floor(gap / 2);
    }

    sortingSteps.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: Array.from({length: n}, (_, k) => k),
        current: [],
        pivot: [],
        explanation: 'Shell sort completed! Array is now fully sorted.'
    });
}

// Counting Sort implementation
function countingSort(arr) {
    const n = arr.length;
    if (n === 0) return;

    const max = Math.max(...arr);
    const min = Math.min(...arr);
    const range = max - min + 1;
    const count = new Array(range).fill(0);
    const output = new Array(n);

    sortingSteps.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: [],
        current: [],
        pivot: [],
        explanation: `Counting occurrences of elements in range ${min} to ${max}`
    });

    // Count occurrences
    for (let i = 0; i < n; i++) {
        count[arr[i] - min]++;
        sortingSteps.push({
            array: [...arr],
            comparing: [i],
            swapping: [],
            sorted: [],
            current: [i],
            pivot: [],
            explanation: `Incremented count of element ${arr[i]}`
        });
    }

    // Modify count array
    for (let i = 1; i < range; i++) {
        count[i] += count[i - 1];
        sortingSteps.push({
            array: [...arr],
            comparing: [i, i - 1],
            swapping: [],
            sorted: [],
            current: [i],
            pivot: [],
            explanation: `Updated count at position ${i} to ${count[i]}`
        });
    }

    // Build output array
    for (let i = n - 1; i >= 0; i--) {
        output[count[arr[i] - min] - 1] = arr[i];
        sortingSteps.push({
            array: [...output],
            comparing: [count[arr[i] - min] - 1],
            swapping: [],
            sorted: [],
            current: [i],
            pivot: [],
            explanation: `Placed element ${arr[i]} at position ${count[arr[i] - min] - 1} in output array`
        });
        count[arr[i] - min]--;
    }

    // Copy to original array
    for (let i = 0; i < n; i++) {
        arr[i] = output[i];
        sortingSteps.push({
            array: [...arr],
            comparing: [i],
            swapping: [],
            sorted: Array.from({length: i + 1}, (_, k) => k),
            current: [],
            pivot: [],
            explanation: `Copied element ${arr[i]} back to original array at position ${i}`
        });
    }

    sortingSteps.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: Array.from({length: n}, (_, k) => k),
        current: [],
        pivot: [],
        explanation: 'Counting sort completed! Array is now fully sorted.'
    });
}

// Radix Sort implementation (LSD)
function radixSort(arr) {
    const n = arr.length;
    if (n === 0) return;

    const max = Math.max(...arr);

    let exp = 1;

    while (Math.floor(max / exp) > 0) {
        countingSortForRadix(arr, exp);
        exp *= 10;
    }

    sortingSteps.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: Array.from({length: n}, (_, k) => k),
        current: [],
        pivot: [],
        explanation: 'Radix sort completed! Array is now fully sorted.'
    });
}

function countingSortForRadix(arr, exp) {
    const n = arr.length;
    const output = new Array(n);
    const count = new Array(10).fill(0);

    // Count occurrences
    for (let i = 0; i < n; i++) {
        const index = Math.floor(arr[i] / exp) % 10;
        count[index]++;
        sortingSteps.push({
            array: [...arr],
            comparing: [i],
            swapping: [],
            sorted: [],
            current: [i],
            pivot: [],
            explanation: `Counting digit ${index} of element ${arr[i]} at exponent ${exp}`
        });
    }

    // Modify count array
    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
        sortingSteps.push({
            array: [...arr],
            comparing: [i, i - 1],
            swapping: [],
            sorted: [],
            current: [i],
            pivot: [],
            explanation: `Updated count at digit ${i} to ${count[i]}`
        });
    }

    // Build output array
    for (let i = n - 1; i >= 0; i--) {
        const index = Math.floor(arr[i] / exp) % 10;
        output[count[index] - 1] = arr[i];
        sortingSteps.push({
            array: [...output],
            comparing: [count[index] - 1],
            swapping: [],
            sorted: [],
            current: [i],
            pivot: [],
            explanation: `Placed element ${arr[i]} at position ${count[index] - 1} in output array`
        });
        count[index]--;
    }

    // Copy to original array
    for (let i = 0; i < n; i++) {
        arr[i] = output[i];
        sortingSteps.push({
            array: [...arr],
            comparing: [i],
            swapping: [],
            sorted: Array.from({length: i + 1}, (_, k) => k),
            current: [],
            pivot: [],
            explanation: `Copied element ${arr[i]} back to original array at position ${i}`
        });
    }
}

// Bucket Sort implementation
function bucketSort(arr) {
    const n = arr.length;
    if (n === 0) return;

    const max = Math.max(...arr);
    const min = Math.min(...arr);
    const bucketCount = Math.floor(Math.sqrt(n));
    const buckets = Array.from({ length: bucketCount }, () => []);

    sortingSteps.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: [],
        current: [],
        pivot: [],
        explanation: `Distributing elements into ${bucketCount} buckets`
    });

    // Distribute elements into buckets
    for (let i = 0; i < n; i++) {
        const index = Math.floor(((arr[i] - min) / (max - min + 1)) * bucketCount);
        buckets[index].push(arr[i]);
        sortingSteps.push({
            array: [...arr],
            comparing: [i],
            swapping: [],
            sorted: [],
            current: [i],
            pivot: [],
            explanation: `Placed element ${arr[i]} into bucket ${index}`
        });
    }

    // Sort individual buckets using insertion sort
    let idx = 0;
    for (let i = 0; i < bucketCount; i++) {
        insertionSortBucket(buckets[i], i);
        for (let j = 0; j < buckets[i].length; j++) {
            arr[idx++] = buckets[i][j];
            sortingSteps.push({
                array: [...arr],
                comparing: [],
                swapping: [],
                sorted: Array.from({length: idx}, (_, k) => k),
                current: [],
                pivot: [],
                explanation: `Copied element ${buckets[i][j]} from bucket ${i} to array position ${idx - 1}`
            });
        }
    }

    sortingSteps.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: Array.from({length: n}, (_, k) => k),
        current: [],
        pivot: [],
        explanation: 'Bucket sort completed! Array is now fully sorted.'
    });
}

function insertionSortBucket(bucket, bucketIndex) {
    for (let i = 1; i < bucket.length; i++) {
        let key = bucket[i];
        let j = i - 1;

        sortingSteps.push({
            array: [],
            comparing: [],
            swapping: [],
            sorted: [],
            current: [i],
            pivot: [],
            explanation: `Inserting element ${key} in bucket ${bucketIndex}`
        });

        while (j >= 0 && bucket[j] > key) {
            bucket[j + 1] = bucket[j];
            j--;

            sortingSteps.push({
                array: [],
                comparing: [],
                swapping: [],
                sorted: [],
                current: [j + 1],
                pivot: [],
                explanation: `Shifted element ${bucket[j + 1]} in bucket ${bucketIndex}`
            });
        }
        bucket[j + 1] = key;
    }
}
