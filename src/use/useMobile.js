import { ref } from 'vue'

export function useMobile() {
    let isMobile = ref(false);

    var resize;

    if(window.innerWidth < 850) {
        isMobile.value = true;
    }
    else{
        isMobile.value = false;
    }

    window.addEventListener('resize', function() {
        clearTimeout(resize);
        resize = setTimeout(onResize, 500);
    });

    const onResize = () => {
        if(window.innerWidth < 850) {
            isMobile.value = true;
        }
        else{
            isMobile.value = false;
        }
    }

    return {
        isMobile
    }
}

