import { useParams } from 'react-router-dom'
import { ANTHROPIC_REQUEST_ID } from '../../data/chapters/aiSpend'
import { ANA_REQUEST_ID } from '../../data/chapters/ana'
import { I2P_REQUEST_ID } from '../../data/chapters/i2p'
import { CONSOLIDATION } from '../../data/chapters/insights'
import { RFP_REQUEST_ID } from '../../data/chapters/rfp'
import { S1_REQUEST_ID } from '../../data/scenario'
import { OutsideDemo } from '../OutsideDemo'
import { RequestPage } from '../RequestPage'
import { AnaRequestPage } from './AnaRequestPage'
import { I2pRequestPage } from './I2pRequestPage'
import { RfpRequestPage } from './RfpRequestPage'
import { SimpleRequestPage } from './SimpleRequestPage'

/** One URL scheme for every request type: /intelligent-workflows/requests/:id/:tab */
export function RequestRouter() {
  const { id } = useParams()
  if (id === S1_REQUEST_ID) return <RequestPage />
  if (id === ANA_REQUEST_ID) return <AnaRequestPage />
  if (id === I2P_REQUEST_ID) return <I2pRequestPage />
  if (id === RFP_REQUEST_ID) return <RfpRequestPage />
  if (id === CONSOLIDATION.requestId || id === ANTHROPIC_REQUEST_ID) return <SimpleRequestPage id={id} />
  return <OutsideDemo missing />
}
