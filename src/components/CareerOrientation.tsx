import { useMemo, useState } from 'react';
import {
  CAREER_PROFILES,
  CAREER_QUESTIONS,
  calculateScores,
  getTopCode,
  type RIASECType,
} from '../lib/career';

type Stage = 'intro' | 'quiz' | 'result';

export default function CareerOrientation({ onClose }: { onClose: () => void }) {
  const [stage, setStage] = useState<Stage>('intro');
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const scores = useMemo(() => calculateScores(answers), [answers]);
  const topCode = useMemo(() => getTopCode(scores), [scores]);
  const profile = CAREER_PROFILES[topCode] || CAREER_PROFILES['RIA'];

  const progress = Math.round((Object.keys(answers).length / CAREER_QUESTIONS.length) * 100);

  function toggleAnswer(questionId: number) {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  }

  function nextQuestion() {
    if (currentQuestion < CAREER_QUESTIONS.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setStage('result');
    }
  }

  function prevQuestion() {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  }

  function restart() {
    setAnswers({});
    setCurrentQuestion(0);
    setStage('intro');
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-panel career-panel" onClick={(e) => e.stopPropagation()}>
        <header className="modal-head">
          <div>
            <h2>Trắc nghiệm định hướng nghề nghiệp</h2>
            <p>Mô hình Holland RIASEC • Tìm hiểu bản thân để định hướng tương lai</p>
          </div>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </header>

        {stage === 'intro' && (
          <div className="career-intro">
            <div className="career-hero">
              <span className="career-badge">Khám phá bản thân</span>
              <h3>Định hướng nghề nghiệp phù hợp với bạn</h3>
              <p>
                Trắc nghiệm này giúp bạn tìm hiểu xu hướng sở thích tự nhiên của mình dựa trên mô hình
                Holland (RIASEC) được sử dụng rộng rãi trong tư vấn hướng nghiệp trên thế giới.
              </p>
            </div>

            <div className="career-features">
              <article>
                <h4>⏱️ Chỉ 5-7 phút</h4>
                <p>24 câu hỏi ngắn gọn, dễ trả lời</p>
              </article>
              <article>
                <h4>🎯 Chính xác & thiết thực</h4>
                <p>Gợi ý ngành học, nghề nghiệp phù hợp với sở thích</p>
              </article>
              <article>
                <h4>💡 Giúp định hướng rõ ràng</h4>
                <p>Phù hợp đặc biệt cho học sinh lớp 10-12 đang phân vân chọn ngành</p>
              </article>
            </div>

            <div className="career-note">
              <p>
                <strong>Lưu ý:</strong> Kết quả chỉ mang tính tham khảo để giúp bạn tự khám phá bản
                thân và định hướng tương lai, không thay thế quyết định cá nhân.
              </p>
            </div>

            <div className="career-actions">
              <button className="btn-primary" onClick={() => setStage('quiz')}>
                Bắt đầu trắc nghiệm
              </button>
            </div>
          </div>
        )}

        {stage === 'quiz' && (
          <div className="career-quiz">
            <div className="career-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progress}%` }} />
              </div>
              <p>
                Câu {currentQuestion + 1} / {CAREER_QUESTIONS.length} • Đã trả lời:{' '}
                {Object.keys(answers).length} câu
              </p>
            </div>

            <div className="question-card">
              <span className="question-number">Câu {currentQuestion + 1}</span>
              <h3>{CAREER_QUESTIONS[currentQuestion].text}</h3>
            </div>

            <div className="answer-options">
              <button
                className={`answer-btn ${answers[CAREER_QUESTIONS[currentQuestion].id] ? 'active' : ''}`}
                onClick={() => toggleAnswer(CAREER_QUESTIONS[currentQuestion].id)}
              >
                {answers[CAREER_QUESTIONS[currentQuestion].id] ? '✓ Đồng ý' : 'Có'}
              </button>
              <button
                className={`answer-btn ${answers[CAREER_QUESTIONS[currentQuestion].id] === false ? 'active' : ''}`}
                onClick={() => {
                  setAnswers((prev) => ({
                    ...prev,
                    [CAREER_QUESTIONS[currentQuestion].id]: false,
                  }));
                }}
              >
                {answers[CAREER_QUESTIONS[currentQuestion].id] === false ? '✓ Không đồng ý' : 'Không'}
              </button>
            </div>

            <div className="quiz-nav">
              <button className="btn-ghost" onClick={prevQuestion} disabled={currentQuestion === 0}>
                ← Câu trước
              </button>
              <button
                className="btn-primary"
                onClick={nextQuestion}
                disabled={answers[CAREER_QUESTIONS[currentQuestion].id] === undefined}
              >
                {currentQuestion === CAREER_QUESTIONS.length - 1 ? 'Xem kết quả' : 'Câu tiếp →'}
              </button>
            </div>
          </div>
        )}

        {stage === 'result' && (
          <div className="career-result">
            <div className="result-header">
              <span className="result-badge">Kết quả của bạn</span>
              <h3>
                Mã Holland: <strong>{topCode}</strong>
              </h3>
              <h2>{profile.name}</h2>
              <p className="result-motto">{profile.motto}</p>
            </div>

            <div className="result-section">
              <h4>📖 Đặc điểm nổi bật</h4>
              <p>{profile.description}</p>
            </div>

            <div className="result-grid">
              <div className="result-card">
                <h4>💪 Điểm mạnh</h4>
                <ul>
                  {profile.strengths.map((s, i) => (
                    <li key={i}>• {s}</li>
                  ))}
                </ul>
              </div>
              <div className="result-card">
                <h4>⚠️ Cần lưu ý</h4>
                <ul>
                  {profile.weaknesses.map((w, i) => (
                    <li key={i}>• {w}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="result-section">
              <h4>🎓 Ngành học phù hợp</h4>
              <div className="tag-list">
                {profile.suitableMajors.map((m, i) => (
                  <span key={i} className="tag">
                    {m}
                  </span>
                ))}
              </div>
            </div>

            <div className="result-section">
              <h4>💼 Nghề nghiệp gợi ý</h4>
              <div className="tag-list">
                {profile.suitableCareers.map((c, i) => (
                  <span key={i} className="tag">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="result-section">
              <h4>💡 Lời khuyên dành cho bạn</h4>
              <ul className="advice-list">
                {profile.advice.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>

            <div className="result-quote">
              <blockquote>{profile.quote}</blockquote>
            </div>

            <div className="result-note">
              <p>
                <strong>Ghi nhớ:</strong> Đây chỉ là công cụ tham khảo để giúp bạn tự khám phá bản
                thân. Hãy kết hợp với sở thích thực tế, khả năng, điều kiện gia đình và thị trường
                việc làm để đưa ra quyết định phù hợp nhất.
              </p>
            </div>

            <div className="result-actions">
              <button className="btn-ghost" onClick={restart}>
                Làm lại trắc nghiệm
              </button>
              <button className="btn-primary" onClick={onClose}>
                Đóng
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
