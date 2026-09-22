export default function LessonTab() {
  return (
    <>
      {/* PART 1: CONDITIONALS */}
      <div className="section-card">
        <span className="section-tag tag-blue">Part 1 · 15 min</span>
        <h2 className="font-space text-xl font-bold mb-1.5">Conditionals — Degrees of Reality</h2>
        <p className="text-[var(--text-muted)] text-sm mb-5 leading-relaxed">
          At B2, you already know the conditionals. Today we look at the fine differences between them — especially how they signal how likely or real something is.
        </p>

        <div className="overflow-x-auto">
          <table className="lesson-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Formula</th>
                <th>Reality Level</th>
                <th>Example</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Zero</strong></td>
                <td><span className="font-space text-[13px] text-[var(--blue-light)] font-medium">If + present → present</span></td>
                <td>Always true / facts</td>
                <td><span className="text-[var(--text-muted)] italic text-[13px]">If you heat ice, it melts.</span></td>
              </tr>
              <tr>
                <td><strong>First</strong></td>
                <td><span className="font-space text-[13px] text-[var(--blue-light)] font-medium">If + present → will</span></td>
                <td>Real & possible</td>
                <td><span className="text-[var(--text-muted)] italic text-[13px]">If I get the job, I'll move to Madrid.</span></td>
              </tr>
              <tr>
                <td><strong>Second</strong></td>
                <td><span className="font-space text-[13px] text-[var(--blue-light)] font-medium">If + past → would</span></td>
                <td>Unlikely / imaginary now</td>
                <td><span className="text-[var(--text-muted)] italic text-[13px]">If I won the lottery, I'd retire.</span></td>
              </tr>
              <tr>
                <td><strong>Third</strong></td>
                <td><span className="font-space text-[13px] text-[var(--blue-light)] font-medium">If + past perfect → would have</span></td>
                <td>Impossible — past regret</td>
                <td><span className="text-[var(--text-muted)] italic text-[13px]">If I had studied, I would have passed.</span></td>
              </tr>
              <tr>
                <td><strong>Mixed</strong></td>
                <td><span className="font-space text-[13px] text-[var(--blue-light)] font-medium">If + past perfect → would</span></td>
                <td>Past cause → present result</td>
                <td><span className="text-[var(--text-muted)] italic text-[13px]">If I had taken the job, I'd be rich now.</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="callout">
          <strong>The key insight:</strong> The conditional type tells the listener exactly how seriously you believe the situation could happen. Choosing the wrong conditional sends the wrong signal — it's not just grammar, it's meaning.
        </div>

        <p className="text-sm text-[var(--text-muted)] mb-2.5">Compare these — same situation, different reality signals:</p>
        <div className="callout callout-amber">
          <strong>First:</strong> "If it rains, I'll take an umbrella." → I genuinely think it might rain.<br/><br/>
          <strong>Second:</strong> "If it rained, I'd take an umbrella." → It probably won't rain, but just imagining it.<br/><br/>
          <strong>Third:</strong> "If it had rained, I would have taken an umbrella." → It didn't rain. That's done.
        </div>

        <ul className="q-list mt-4">
          <li><span className="q-num">💬</span> <span>Make a First Conditional sentence about something you're planning this week.</span></li>
          <li><span className="q-num">💬</span> <span>Make a Second Conditional — something unlikely but fun to imagine.</span></li>
          <li><span className="q-num">💬</span> <span>Make a Third Conditional — something you regret or wish had gone differently.</span></li>
        </ul>
      </div>

      {/* PART 2: PROBABILITY */}
      <div className="section-card">
        <span className="section-tag tag-amber">Part 2 · 15 min</span>
        <h2 className="font-space text-xl font-bold mb-1.5">Expressing Probability & Severity</h2>
        <p className="text-[var(--text-muted)] text-sm mb-5 leading-relaxed">
          English has many ways to show how certain or uncertain you are. These expressions work alongside conditionals to give your speech precision and nuance.
        </p>

        <ProbabilityScale />

        <div className="callout callout-amber mt-5">
          <strong>Severity language</strong> — how serious is the situation?<br/><br/>
          <span className="text-[var(--text)]">
            Minor: <em>a slight issue / a small concern / a minor problem</em><br/>
            Moderate: <em>a significant challenge / a notable risk / fairly serious</em><br/>
            Severe: <em>a critical issue / a major threat / extremely serious / devastating</em>
          </span>
        </div>

        <p className="text-sm leading-relaxed mt-4">Combining probability + severity is how educated speakers talk about risk, plans and outcomes:</p>
        <div className="callout callout-green">
          <strong>"There's a significant chance the project might be delayed, which could have serious consequences for the budget."</strong><br/><br/>
          → <span className="text-[var(--text)]">Probability: <em>significant chance / might</em> &nbsp;|&nbsp; Severity: <em>serious consequences</em></span>
        </div>

        <ul className="q-list mt-4">
          <li><span className="q-num">💬</span> <span>Talk about something in your life that is "likely but not certain" to happen soon.</span></li>
          <li><span className="q-num">💬</span> <span>Describe a risk at work or in the news — use both probability AND severity language.</span></li>
        </ul>
      </div>

      {/* PART 3: SHOULD VS COULD */}
      <div className="section-card">
        <span className="section-tag tag-green">Part 3 · 15 min</span>
        <h2 className="font-space text-xl font-bold mb-1.5">Should vs Could — The Fine Difference</h2>
        <p className="text-[var(--text-muted)] text-sm mb-5 leading-relaxed">
          These two are often confused — especially in advice, suggestions and probability. The difference is about expectation vs possibility.
        </p>

        <div className="overflow-x-auto">
          <table className="lesson-table">
            <thead>
              <tr>
                <th>Use</th>
                <th>Should</th>
                <th>Could</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Advice</strong></td>
                <td><span className="text-[var(--text-muted)] italic text-[13px]">"You should see a doctor." (I strongly think so)</span></td>
                <td><span className="text-[var(--text-muted)] italic text-[13px]">"You could see a doctor." (It's an option)</span></td>
              </tr>
              <tr>
                <td><strong>Expectation</strong></td>
                <td><span className="text-[var(--text-muted)] italic text-[13px]">"The train should arrive at 9." (Expected)</span></td>
                <td><span className="text-[var(--text-muted)] italic text-[13px]">"The train could arrive late." (Possibility)</span></td>
              </tr>
              <tr>
                <td><strong>Criticism</strong></td>
                <td><span className="text-[var(--text-muted)] italic text-[13px]">"You should have called me!" (You didn't — I'm upset)</span></td>
                <td><span className="text-[var(--text-muted)] italic text-[13px]">"You could have called me." (It was possible but softer)</span></td>
              </tr>
              <tr>
                <td><strong>Suggestion</strong></td>
                <td><span className="text-[var(--text-muted)] italic text-[13px]">"We should meet on Friday." (I think it's the best idea)</span></td>
                <td><span className="text-[var(--text-muted)] italic text-[13px]">"We could meet on Friday." (One of several options)</span></td>
              </tr>
              <tr>
                <td><strong>Probability</strong></td>
                <td><span className="text-[var(--text-muted)] italic text-[13px]">"That should work." (~70% confident)</span></td>
                <td><span className="text-[var(--text-muted)] italic text-[13px]">"That could work." (~35% — just a possibility)</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="callout">
          <strong>The rule in one sentence:</strong> <em>Should</em> carries weight — expectation, strong advice, mild obligation. <em>Could</em> is lighter — it opens a door without pushing you through it.
        </div>

        <div className="callout callout-amber mt-3">
          <strong>Past forms — notice the shift:</strong><br/><br/>
          <span className="text-[var(--text)]">
            "You <strong>should have</strong> told me." → You didn't. I expected you to. (Criticism / regret)<br/>
            "You <strong>could have</strong> told me." → It was possible but you chose not to. (Softer observation)<br/>
            "It <strong>should have</strong> worked." → I expected it to work but it didn't.<br/>
            "It <strong>could have</strong> been worse." → Things were bad, but worse was possible.
          </span>
        </div>

        <ul className="q-list mt-4">
          <li><span className="q-num">💬</span> <span>Think of something you regret. Say it with "should have" and "could have" — what's the difference in feeling?</span></li>
          <li><span className="q-num">💬</span> <span>Give me a piece of advice using "should" and then soften it with "could."</span></li>
        </ul>
      </div>

      {/* STORY */}
      <div className="section-card">
        <span className="section-tag tag-blue">Story · 5 min</span>
        <h2 className="font-space text-xl font-bold mb-1.5">Bringing It All Together</h2>
        <p className="text-[var(--text-muted)] text-sm mb-5 leading-relaxed">
          Read this story — all three topics appear naturally. Spot them as you go.
        </p>

        <div className="story-box">
          Marco runs a small restaurant. Last month, he heard that a big supermarket <em>might</em> open nearby — a <em>significant threat</em> to his business. His accountant said: "If the supermarket opens, you <em>will</em> lose at least 20% of your customers. You <em>should</em> start thinking about what makes you different." Marco thought about it. "<em>If I had invested</em> in marketing last year, I <em>would have been</em> better prepared now." He <em>could have</em> panicked, but instead he came up with a plan. He told his team: "There's a <em>chance</em> this <em>could</em> hurt us, but if we focus on quality and community, we <em>should</em> be fine. We <em>might</em> even grow." Six months later, the supermarket opened. Marco's restaurant was busier than ever — because he <em>should have</em> worried less and trusted his instincts from the start.
        </div>

        <ul className="q-list mt-4">
          <li><span className="q-num">1.</span><span>Find two examples of probability language in the story.</span></li>
          <li><span className="q-num">2.</span><span>Which conditional does "If I had invested... I would have been" belong to?</span></li>
          <li><span className="q-num">3.</span><span>What's the difference between "could have panicked" and "should have panicked" in this context?</span></li>
          <li><span className="q-num">4.</span><span>Retell the story in your own words — use at least one conditional and one modal.</span></li>
        </ul>
      </div>

      {/* WRAP UP */}
      <div className="section-card">
        <span className="section-tag tag-green">Wrap-up · 5 min</span>
        <h2 className="font-space text-xl font-bold mb-1.5">Key Takeaways</h2>
        <ul className="q-list">
          <li><span className="q-num">✅</span><span>The conditional you choose signals how real or possible a situation is — it's a meaning choice, not just grammar.</span></li>
          <li><span className="q-num">✅</span><span>Combine probability words (might, could, will probably) with severity words (minor, significant, critical) to speak with precision.</span></li>
          <li><span className="q-num">✅</span><span>Should = weight, expectation, strong advice. Could = possibility, a softer option, less certainty.</span></li>
          <li><span className="q-num">✅</span><span>In the past: should have = criticism/regret. Could have = what was possible but didn't happen.</span></li>
        </ul>
      </div>
    </>
  );
}

function ProbabilityScale() {
  const items = [
    { label: 'Certain', pct: 100, color: '#10b981' },
    { label: 'Will definitely', pct: 95, color: '#3b82f6' },
    { label: 'Will probably', pct: 80, color: '#60a5fa' },
    { label: 'Should / Ought to', pct: 70, color: '#a78bfa' },
    { label: 'May / Might', pct: 50, color: '#f59e0b' },
    { label: 'Could (possibly)', pct: 35, color: '#fb923c' },
    { label: 'Unlikely to', pct: 15, color: '#ef4444' },
    { label: "Won't / Can't", pct: 5, color: '#94a3b8' },
  ];

  return (
    <div className="prob-scale">
      {items.map((item) => (
        <div key={item.label} className="prob-row">
          <span className="prob-label" style={{ color: item.color }}>{item.label}</span>
          <div className="prob-bar-wrap">
            <div className="prob-bar" style={{ width: `${item.pct}%`, background: item.color }} />
          </div>
          <span className="prob-pct">~{item.pct}%</span>
        </div>
      ))}
    </div>
  );
}
