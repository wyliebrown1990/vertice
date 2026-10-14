import clsx from 'clsx'
import { Flag, NotebookText, RotateCcw, Sparkles, Trophy } from 'lucide-react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { SidePanel } from '../components/ui/Overlay'
import { checkpointRoute, type CheckpointId } from '../domain/transitions'
import { useDemo } from '../store/demo'
import { useUi } from '../store/ui'
import { notes } from './notes'
import { useBeat } from './useBeat'

const isTyping = (t: EventTarget | null) => {
  const el = t as HTMLElement | null
  if (!el) return false
  return el.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName)
}

/**
 * Presenter-only recovery controls (opt-in via ?presenter=1):
 * Start · Final offer · Outcome · Notes · Reset. Each checkpoint replaces the
 * whole mutable scenario. Shortcuts mirror the buttons and ignore text fields.
 */
export function PresenterControls() {
  const presenter = useUi((s) => s.presenter)
  const notesOpen = useUi((s) => s.notesOpen)
  const setNotesOpen = useUi((s) => s.setNotesOpen)
  const toast = useUi((s) => s.toast)
  const setAiOpen = useUi((s) => s.setAiOpen)
  const loadCheckpoint = useDemo((s) => s.loadCheckpoint)
  const resetDemo = useDemo((s) => s.resetDemo)
  const revealFinalOffer = useDemo((s) => s.revealFinalOffer)
  const stage = useDemo((s) => s.request?.stage)
  const navigate = useNavigate()

  const go = (id: CheckpointId) => {
    setAiOpen(false)
    if (id === 'start') resetDemo()
    else loadCheckpoint(id)
    navigate(checkpointRoute(id))
    toast(id === 'start' ? 'Demo reset to a clean start' : id === 'final-offer' ? 'Loaded checkpoint: final offer' : 'Loaded checkpoint: outcome', 'info')
  }

  useEffect(() => {
    if (!presenter) return
    const onKey = (e: KeyboardEvent) => {
      if (isTyping(e.target) || e.metaKey || e.ctrlKey || e.altKey) return
      if (e.key === '.') {
        e.preventDefault()
        setNotesOpen(!useUi.getState().notesOpen)
      } else if (e.shiftKey && e.key.toLowerCase() === 'r') {
        e.preventDefault()
        go('start')
      } else if (e.shiftKey && e.key.toLowerCase() === 'n') {
        // Only meaningful while negotiating; never approves anything.
        if (useDemo.getState().request?.stage === 'negotiation') {
          e.preventDefault()
          revealFinalOffer()
          toast('Final offer received', 'info')
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [presenter])

  if (!presenter) return null

  const btn = 'inline-flex h-7 items-center gap-1.5 rounded-md px-2 text-[12px] font-medium text-white/80 hover:bg-white/10 hover:text-white'

  return (
    <>
      <div
        className="fixed bottom-4 left-[264px] z-30 flex items-center gap-0.5 rounded-lg bg-ink/92 p-1 shadow-[var(--shadow-pop)] backdrop-blur"
        role="toolbar"
        aria-label="Presenter controls"
      >
        <span className="px-2 text-[11px] font-semibold tracking-wide text-white/45 uppercase">Presenter</span>
        <button className={btn} onClick={() => go('start')} title="Reset to clean dashboard (Shift+R)">
          <Flag className="size-3.5" /> Start
        </button>
        <button className={btn} onClick={() => go('final-offer')} title="Requirements submitted, final offer ready">
          <Sparkles className="size-3.5" /> Final offer
        </button>
        <button className={btn} onClick={() => go('outcome')} title="Completed renewal with one savings entry">
          <Trophy className="size-3.5" /> Outcome
        </button>
        <span className="mx-0.5 h-4 w-px bg-white/15" />
        <button className={clsx(btn, notesOpen && 'bg-white/15 text-white')} onClick={() => setNotesOpen(!notesOpen)} title="Toggle notes (.)">
          <NotebookText className="size-3.5" /> Notes
        </button>
        <button className={btn} onClick={() => go('start')} title="Reset (Shift+R)">
          <RotateCcw className="size-3.5" /> Reset
        </button>
        {stage === 'negotiation' && <span className="px-1.5 text-[11px] text-white/45">Shift+N: final offer</span>}
      </div>
      <NotesPanel open={notesOpen} onOpenChange={setNotesOpen} />
    </>
  )
}

function NotesPanel({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const beat = useBeat()
  const n = notes[beat]
  return (
    <SidePanel open={open} onOpenChange={onOpenChange} title="Presenter notes" widthClass="w-[340px]" side="left" dark>
      <div className="h-full space-y-4 overflow-y-auto px-4 py-4 text-[13px] leading-relaxed">
        <p className="text-[11px] font-semibold tracking-wide text-white/40 uppercase">Beat · {beat}</p>
        <p className="text-[15px] font-semibold text-white">{n.headline}</p>
        <section>
          <h4 className="text-[11px] font-semibold tracking-wide text-violet-300 uppercase">On screen</h4>
          <p className="mt-1 text-white/80">{n.evidence}</p>
        </section>
        {n.proof && (
          <section>
            <h4 className="text-[11px] font-semibold tracking-wide text-violet-300 uppercase">Proof</h4>
            <p className="mt-1 text-white/80">{n.proof.text}</p>
            <p className="mt-1 text-[11.5px] text-white/40">{n.proof.source}</p>
          </section>
        )}
        {n.discovery && (
          <section>
            <h4 className="text-[11px] font-semibold tracking-wide text-violet-300 uppercase">Ask</h4>
            <p className="mt-1 text-white/80">“{n.discovery}”</p>
          </section>
        )}
        <section>
          <h4 className="text-[11px] font-semibold tracking-wide text-violet-300 uppercase">Transition</h4>
          <p className="mt-1 text-white/80">{n.transition}</p>
        </section>
        <p className="border-t border-white/10 pt-3 text-[11.5px] text-white/40">Visible to the audience if you’re screen-sharing this window.</p>
      </div>
    </SidePanel>
  )
}
