// DREAMING ANIME - AI RECOMMENDER (DA-AR)
// VERSION: 1.1.0 (Fixed Grid ID)

let arMood = '';
let arLen = '';

function arSelectMood(btn) {
    document.querySelectorAll('.ar-mood-btn').forEach(b => {
        b.style.background = '#111';
        b.style.borderColor = '#222';
    });
    btn.style.background = 'rgba(232, 93, 4, 0.1)';
    btn.style.borderColor = '#E85D04';
    arMood = btn.getAttribute('data-mood');
    const nextBtn = document.getElementById('ar-next1');
    nextBtn.style.opacity = '1';
    nextBtn.style.pointerEvents = 'auto';
}

function arGoStep2() {
    document.getElementById('ar-step1').style.display = 'none';
    document.getElementById('ar-step2').style.display = 'block';
    document.getElementById('ar-dot-2').style.background = '#E85D04';
    document.getElementById('ar-step-label').textContent = 'Step 2 of 3';
}

function arGoStep1() {
    document.getElementById('ar-step2').style.display = 'none';
    document.getElementById('ar-step1').style.display = 'block';
    document.getElementById('ar-dot-2').style.background = '#333';
    document.getElementById('ar-step-label').textContent = 'Step 1 of 3';
}

function arSelectLen(btn) {
    document.querySelectorAll('.ar-len-btn').forEach(b => {
        b.style.background = '#111';
        b.style.borderColor = '#222';
    });
    btn.style.background = 'rgba(232, 93, 4, 0.1)';
    btn.style.borderColor = '#E85D04';
    arLen = btn.getAttribute('data-len');
    const nextBtn = document.getElementById('ar-next2');
    nextBtn.style.opacity = '1';
    nextBtn.style.pointerEvents = 'auto';
}

function arGoStep3() {
    document.getElementById('ar-step2').style.display = 'none';
    document.getElementById('ar-step3').style.display = 'block';
    document.getElementById('ar-dot-3').style.background = '#E85D04';
    document.getElementById('ar-step-label').textContent = 'Step 3 of 3';
}

function arGoStep2Back() {
    document.getElementById('ar-step3').style.display = 'none';
    document.getElementById('ar-step2').style.display = 'block';
    document.getElementById('ar-dot-3').style.background = '#333';
    document.getElementById('ar-step-label').textContent = 'Step 2 of 3';
}

function arGetResults() {
    const resultsDiv = document.getElementById('ar-results');
    const step3Div = document.getElementById('ar-step3');
    const grid = document.getElementById('ar-cards'); // Fixed ID
    
    step3Div.style.display = 'none';
    resultsDiv.style.display = 'block';
    document.getElementById('ar-progress').style.display = 'none';
    document.getElementById('ar-step-label').textContent = 'YOUR MATCHES';

    // Mock recommendation logic
    let recommendations = [];
    if (arMood === 'action') {
        recommendations = [
            { title: 'Solo Leveling', desc: 'The weak hunter becomes the strongest.', img: 'https://m.media-amazon.com/images/I/71p0WfB6UML._AC_UF1000,1000_QL80_.jpg', link: 'https://www.crunchyroll.com/series/GBEHGGVVZ/solo-leveling' },
            { title: 'Jujutsu Kaisen', desc: 'Cursed energy and sorcery.', img: 'https://m.media-amazon.com/images/I/81s+9kvS8uL._AC_UF1000,1000_QL80_.jpg', link: 'https://www.crunchyroll.com/series/GR9PJ47W6/jujutsu-kaisen' }
        ];
    } else if (arMood === 'emotional') {
        recommendations = [
            { title: 'Your Lie in April', desc: 'A beautiful, tragic story of music and love.', img: 'https://m.media-amazon.com/images/M/MV5BYThhNmFmY2ItYjVlOC00MTFlLTk0Y2UtYzQ1Zjg5ZTU5Y2I0XkEyXkFqcGdeQXVyMzg2MzE2OTE@._V1_.jpg', link: 'https://www.crunchyroll.com/series/G675XN366/your-lie-in-april' }
        ];
    } else if (arMood === 'dark') {
        recommendations = [
            { title: 'Death Note', desc: 'A notebook that kills.', img: 'https://m.media-amazon.com/images/I/71I3uS+uLSL._AC_UF1000,1000_QL80_.jpg', link: 'https://www.netflix.com/title/70204970' },
            { title: 'Parasyte', desc: 'Aliens invading human bodies.', img: 'https://m.media-amazon.com/images/I/81+p4-v8Y2L._AC_UF1000,1000_QL80_.jpg', link: 'https://www.crunchyroll.com/series/G6W9N1NV6/parasyte-the-maxim-' }
        ];
    } else {
        recommendations = [
            { title: 'Re:Zero', desc: 'Suffering and starting over in another world.', img: 'https://m.media-amazon.com/images/I/71y+mU6rLIL._AC_UF1000,1000_QL80_.jpg', link: 'https://www.crunchyroll.com/series/GR751KNZY/rezero--starting-life-in-another-world-' }
        ];
    }

    grid.innerHTML = recommendations.map(rec => `
        <div style="background:#111;border:1px solid #222;border-radius:12px;padding:20px;text-align:center;">
            <img src="${rec.img}" style="width:100%;height:200px;object-fit:cover;border-radius:8px;margin-bottom:16px;">
            <h4 style="font-family:'Bangers',cursive;font-size:1.5rem;color:#fff;margin-bottom:8px;">${rec.title}</h4>
            <p style="color:#aaa;font-size:0.85rem;margin-bottom:16px;">${rec.desc}</p>
            <a href="${rec.link}" target="_blank" style="display:inline-block;padding:8px 20px;background:#E85D04;color:#fff;text-decoration:none;border-radius:4px;font-weight:700;font-size:0.8rem;">Watch Now</a>
        </div>
    `).join('');
}

function arRestart() {
    location.reload();
}
