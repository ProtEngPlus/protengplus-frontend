import {
  Page,
  Text,
  View,
  Document,
  PDFViewer,
  Image,
} from "@react-pdf/renderer";
import { ReportStyles as styles } from "./ReportStyle";
import logo from "../../../assets/images/Report/protengplus-logo.png";
import GeneralInfo from "./StageReport/GeneralInfo/GeneralInfo";
import ProteinQueryReport from "./StageReport/ProteinQueryReport/ProteinQueryReport";
import ProteinRepresentationReport from "./StageReport/ProteinRepresentationReport/ProteinRepresentationReport";
import TopModelReport from "./StageReport/TopModelReport/TopModelReport";
import MutationReport from "./StageReport/MutationReport/MutationReport";
import { formatTime } from "../../utils/FormatTime";
import UploadLabResultReport from "./StageReport/UploadLabResultReport/UploadLabResultReport";
import QueryResultReport from "./StageReport/QueryResultReport/QueryResultReport";
import dayjs from 'dayjs';

export default function ReportPDF() {
  const username = "John Doe";
  const jobMockData = {
    artifact: {
      blast: {
        bucket_name: "similar_protein",
        path: "67a3a0487b6567267ca89b2b",
      },
      ridgecv: {
        bucket_name: "ridgecv",
        path: "67a3a0487b6567267ca89b2b.pkl",
      },
      unirep: {
        bucket_name: "unirep",
        path: "67a3a0487b6567267ca89b2b.pkl",
      },
    },
    complete_at: "2025-02-05T17:55:05.317Z",
    created_at: "2025-02-05T17:30:48.059Z",
    description: "this is a job",
    error_logs: [],
    id: "67a3a0487b6567267ca89b2b",
    input_protein:
      "MSIQFFRVALIPFFAAFCLPVFAHPETLVKVKDAEDQLGARVGYIELDLNSGKILESFRPEERFPMMSTFKVLLCGAVLSRVDAGQEQLGRRIHYSQNDLVEYSPVTEKHLTDGMTVRELCSAAITMSDNTAANLLLTTIGGPKELTAFLHNMGDHVTRLDRWEPELNEAIPNDERDTTMPAAMATTLRKLLTGELLTLASRQQLIDWMEADKVAGPLLRSALPAGWFIADKSGAGERGSRGIIAALGPDGKPSRIVVIYTTGSQATMDERNRQIAEIGASLIKHW",
    is_notification_on: true,
    lab_result: {
      scores: [
        0.002914, 0.00302, 0.002219, 0.004379, 0.002914, 0.00302, 0.002219,
        0.004379, 0.002914, 0.00302, 0.002219, 0.004379, 0.002914, 0.00302,
        0.002219, 0.004379, 0.002914, 0.00302, 0.002219, 0.004379, 0.002914,
        0.00302, 0.002219, 0.004379,
      ],
      sequences: [
        "ASIQHFHW",
        "CSIQHFHW",
        "DSIQHFHW",
        "ESIQHFHW",
        "FSIQHFHW",
        "GSIQHFHW",
        "HSIQHFHW",
        "ISIQHFHW",
        "JSIQHFHW",
        "KSIQHFHW",
        "LSIQHFHW",
        "MSIQHFHW",
        "NSIQHFHW",
        "OSIQHFHW",
        "PSIQHFHW",
        "QSIQHFHW",
        "RSIQHFHW",
        "SSIQHFHW",
        "TSIQHFHW",
        "USIQHFHW",
        "VSIQHFHW",
        "WSIQHFHW",
        "XSIQHFHW",
        "YSIQHFHW",
      ],
      total: 24,
    },
    meta: ["blast", "unirep", "ridgecv", "mutation"],
    name: "Test_runtime_job4",
    options: {
      blast: {
        database: "nr",
        expect: 10,
        hitlist_size: 50,
        hsp_cov: 50,
        perc_ident: 85,
        program: "blastp",
        random_state: 50,
        seq_length: 300,
      },
      mutation: {
        mutate_pos_range: 8,
        num_iterations: 25,
        num_trajectories: 5,
        temperature: 0.01,
      },
      ridgecv: {
        alpha: 0.1,
        n_batch: 20,
        train_batch_sizes: [24, 64, 96],
      },
      unirep: {
        learning_rate_config_high: 0.001,
        learning_rate_config_low: 0.00001,
        n_epochs_config_high: 1,
        n_epochs_config_low: 1,
        n_splits: 2,
        n_trials: 2,
      },
    },
    ref_job_id: "000000000000000000000000",
    run_time: {
      evotune: {
        end_time: "2025-02-05T17:33:35.098Z",
        start_time: "2025-02-05T17:33:01.501Z",
      },
      fittop: {
        end_time: "2025-02-05T17:33:47.701Z",
        start_time: "2025-02-05T17:33:35.275Z",
      },
      mutation: {
        end_time: "0001-01-01T00:00:00Z",
        start_time: "2025-02-05T17:33:48.301Z",
      },
      query: {
        end_time: "2025-02-05T17:33:01.085Z",
        start_time: "2025-02-05T17:30:55.531Z",
      },
    },
    run_type: "auto",
    stage_id: 3,
    state: "COMPLETED",
    updated_at: "2025-02-05T17:55:05.317Z",
    user_id: "672850f8f90bb0327c9dc7d5",
  };

  const queryResultData = [
    {
      acc_len: 286,
      accession: "ANG15030",
      description: "beta-lactamase TEM-1 variant",
      e_values: 0,
      hsp_query_from: 1,
      hsp_query_to: 286,
      id: "67926f0b5ae5bc1b8514f988",
      is_selected: true,
      max_score: 589.726,
      organisms: "synthetic construct",
      percent_identity: 99.65034965034964,
      query_cover: 100,
      score: 1519,
      sequences:
        "MSIQYFRVALIPFFAAFCLPVFAHPETLVKVKDAEDQLGARVGYIELDLNSGKILESFRPEERFPMMSTFKVLLCGAVLSRVDAGQEQLGRRIHYSQNDLVEYSPVTEKHLTDGMTVRELCSAAITMSDNTAANLLLTTIGGPKELTAFLHNMGDHVTRLDRWEPELNEAIPNDERDTTMPAAMATTLRKLLTGELLTLASRQQLIDWMEADKVAGPLLRSALPAGWFIADKSGAGERGSRGIIAALGPDGKPSRIVVIYTTGSQATMDERNRQIAEIGASLIKHW",
    },
    {
      acc_len: 286,
      accession: "ANG26997",
      description: "beta-lactamase TEM-1 variant",
      e_values: 0,
      hsp_query_from: 1,
      hsp_query_to: 286,
      id: "67926f0b5ae5bc1b8514f989",
      is_selected: true,
      max_score: 589.341,
      organisms: "synthetic construct",
      percent_identity: 99.3006993006993,
      query_cover: 100,
      score: 1518,
      sequences:
        "MSIQYFRVALIPFFAAFCLPVFAHPETLVKVKDAEDQLGARVGYIELDLNSGKILESFRPEERFPMMSTFKVLLCGAVLSRVDAGQEQLGRRIHYSQNDLVEYSPVTEKHLTDGMTVRELCSAAITMSDNTAANLLLTTVGGPKELTAFLHNMGDHVTRLDRWEPELNEAIPNDERDTTMPAAMATTLRKLLTGELLTLASRQQLIDWMEADKVAGPLLRSALPAGWFIADKSGAGERGSRGIIAALGPDGKPSRIVVIYTTGSQATMDERNRQIAEIGASLIKHW",
    },
    {
      acc_len: 297,
      accession: "EKW4005960",
      description: "TEM family class A beta-lactamase",
      e_values: 0,
      hsp_query_from: 1,
      hsp_query_to: 286,
      id: "67926f0b5ae5bc1b8514f98a",
      is_selected: true,
      max_score: 588.956,
      organisms: "Klebsiella pneumoniae",
      percent_identity: 99.65034965034964,
      query_cover: 100,
      score: 1517,
      sequences:
        "MSIQHFRVALIPFFAAFCLPVFAHPETLVKVKDAEDQLGARVGYIELDLNSGKILESFRPEERFPMMSTFKVLLCGAVLSRVDAGQEQLGRRIHYSQNDLVEYSPVTEKHLTDGMTVRELCSAAITMSDNTAANLLLTTIGGPKELTAFLHNMGDHVTRLDRWEPELNEAIPNDERDTTMPAAMATTLRKLLTGELLTLASRQQLIDWMEADKVAGPLLRSALPAGWFIADKSGAGERGSRGIIAALGPDGKPSRIVVIYTTGSQATMDERNRQIAEIGASLIKHW",
    },
    {
      acc_len: 290,
      accession: "AMM70781",
      description: "TEM family class A beta-lactamase, partial",
      e_values: 0,
      hsp_query_from: 1,
      hsp_query_to: 286,
      id: "67926f0b5ae5bc1b8514f98b",
      is_selected: true,
      max_score: 588.571,
      organisms: "Escherichia coli",
      percent_identity: 99.65034965034964,
      query_cover: 100,
      score: 1516,
      sequences:
        "MSIQHFRVALIPFFAAFCLPVFAHPETLVKVKDAEDQLGARVGYIELDLNSGKILESFRPEERFPMMSTFKVLLCGAVLSRVDAGQEQLGRRIHYSQNDLVEYSPVTEKHLTDGMTVRELCSAAITMSDNTAANLLLTTIGGPKELTAFLHNMGDHVTRLDRWEPELNEAIPNDERDTTMPAAMATTLRKLLTGELLTLASRQQLIDWMEADKVAGPLLRSALPAGWFIADKSGAGERGSRGIIAALGPDGKPSRIVVIYTTGSQATMDERNRQIAEIGASLIKHW",
    },
    {
      acc_len: 294,
      accession: "HBQ2613975",
      description: "TEM family class A beta-lactamase",
      e_values: 0,
      hsp_query_from: 1,
      hsp_query_to: 286,
      id: "67926f0b5ae5bc1b8514f98c",
      is_selected: true,
      max_score: 588.571,
      organisms: "Klebsiella pneumoniae",
      percent_identity: 99.65034965034964,
      query_cover: 100,
      score: 1516,
      sequences:
        "MSIQHFRVALIPFFAAFCLPVFAHPETLVKVKDAEDQLGARVGYIELDLNSGKILESFRPEERFPMMSTFKVLLCGAVLSRVDAGQEQLGRRIHYSQNDLVEYSPVTEKHLTDGMTVRELCSAAITMSDNTAANLLLTTIGGPKELTAFLHNMGDHVTRLDRWEPELNEAIPNDERDTTMPAAMATTLRKLLTGELLTLASRQQLIDWMEADKVAGPLLRSALPAGWFIADKSGAGERGSRGIIAALGPDGKPSRIVVIYTTGSQATMDERNRQIAEIGASLIKHW",
    },
    {
      acc_len: 297,
      accession: "EJG7116187",
      description: "TEM family class A beta-lactamase",
      e_values: 0,
      hsp_query_from: 1,
      hsp_query_to: 286,
      id: "67926f0b5ae5bc1b8514f98d",
      is_selected: true,
      max_score: 588.571,
      organisms: "Escherichia coli",
      percent_identity: 99.65034965034964,
      query_cover: 100,
      score: 1516,
      sequences:
        "MSIQHFRVALIPFFAAFCLPVFAHPETLVKVKDAEDQLGARVGYIELDLNSGKILESFRPEERFPMMSTFKVLLCGAVLSRVDAGQEQLGRRIHYSQNDLVEYSPVTEKHLTDGMTVRELCSAAITMSDNTAANLLLTTIGGPKELTAFLHNMGDHVTRLDRWEPELNEAIPNDERDTTMPAAMATTLRKLLTGELLTLASRQQLIDWMEADKVAGPLLRSALPAGWFIADKSGAGERGSRGIIAALGPDGKPSRIVVIYTTGSQATMDERNRQIAEIGASLIKHW",
    },
    {
      acc_len: 296,
      accession: "MES4015624",
      description: "TEM family class A beta-lactamase",
      e_values: 0,
      hsp_query_from: 1,
      hsp_query_to: 286,
      id: "67926f0b5ae5bc1b8514f98e",
      is_selected: true,
      max_score: 588.571,
      organisms: "Escherichia coli",
      percent_identity: 99.65034965034964,
      query_cover: 100,
      score: 1516,
      sequences:
        "MSIQHFRVALIPFFAAFCLPVFAHPETLVKVKDAEDQLGARVGYIELDLNSGKILESFRPEERFPMMSTFKVLLCGAVLSRVDAGQEQLGRRIHYSQNDLVEYSPVTEKHLTDGMTVRELCSAAITMSDNTAANLLLTTIGGPKELTAFLHNMGDHVTRLDRWEPELNEAIPNDERDTTMPAAMATTLRKLLTGELLTLASRQQLIDWMEADKVAGPLLRSALPAGWFIADKSGAGERGSRGIIAALGPDGKPSRIVVIYTTGSQATMDERNRQIAEIGASLIKHW",
    },
    {
      acc_len: 299,
      accession: "ENZ7910035",
      description: "TEM family class A beta-lactamase",
      e_values: 0,
      hsp_query_from: 1,
      hsp_query_to: 286,
      id: "67926f0b5ae5bc1b8514f98f",
      is_selected: true,
      max_score: 588.186,
      organisms: "Escherichia coli",
      percent_identity: 99.65034965034964,
      query_cover: 100,
      score: 1515,
      sequences:
        "MSIQHFRVALIPFFAAFCLPVFAHPETLVKVKDAEDQLGARVGYIELDLNSGKILESFRPEERFPMMSTFKVLLCGAVLSRVDAGQEQLGRRIHYSQNDLVEYSPVTEKHLTDGMTVRELCSAAITMSDNTAANLLLTTIGGPKELTAFLHNMGDHVTRLDRWEPELNEAIPNDERDTTMPAAMATTLRKLLTGELLTLASRQQLIDWMEADKVAGPLLRSALPAGWFIADKSGAGERGSRGIIAALGPDGKPSRIVVIYTTGSQATMDERNRQIAEIGASLIKHW",
    },
    {
      acc_len: 286,
      accession: "ANG19238",
      description: "beta-lactamase TEM-1 variant",
      e_values: 0,
      hsp_query_from: 1,
      hsp_query_to: 286,
      id: "67926f0b5ae5bc1b8514f990",
      is_selected: true,
      max_score: 588.186,
      organisms: "synthetic construct",
      percent_identity: 99.3006993006993,
      query_cover: 100,
      score: 1515,
      sequences:
        "MSIQYFRVALIPFFAAFCLPVFAHPETLVKVKDAEDRLGARVGYIELDLNSGKILESFRPEERFPMMSTFKVLLCGAVLSRVDAGQEQLGRRIHYSQNDLVEYSPVTEKHLTDGMTVRELCSAAITMSDNTAANLLLTTIGGPKELTAFLHNMGDHVTRLDRWEPELNEAIPNDERDTTMPAAMATTLRKLLTGELLTLASRQQLIDWMEADKVAGPLLRSALPAGWFIADKSGAGERGSRGIIAALGPDGKPSRIVVIYTTGSQATMDERNRQIAEIGASLIKHW",
    },
    {
      acc_len: 292,
      accession: "XJL55530",
      description: "TEM family class A beta-lactamase",
      e_values: 0,
      hsp_query_from: 1,
      hsp_query_to: 286,
      id: "67926f0b5ae5bc1b8514f991",
      is_selected: true,
      max_score: 587.8,
      organisms: "Escherichia coli",
      percent_identity: 99.65034965034964,
      query_cover: 100,
      score: 1514,
      sequences:
        "MSIQHFRVALIPFFAAFCLPVFAHPETLVKVKDAEDQLGARVGYIELDLNSGKILESFRPEERFPMMSTFKVLLCGAVLSRVDAGQEQLGRRIHYSQNDLVEYSPVTEKHLTDGMTVRELCSAAITMSDNTAANLLLTTIGGPKELTAFLHNMGDHVTRLDRWEPELNEAIPNDERDTTMPAAMATTLRKLLTGELLTLASRQQLIDWMEADKVAGPLLRSALPAGWFIADKSGAGERGSRGIIAALGPDGKPSRIVVIYTTGSQATMDERNRQIAEIGASLIKHW",
    },
    {
      acc_len: 286,
      accession: "ANG18813",
      description: "beta-lactamase TEM-1 variant",
      e_values: 0,
      hsp_query_from: 1,
      hsp_query_to: 286,
      id: "67926f0b5ae5bc1b8514f992",
      is_selected: true,
      max_score: 587.8,
      organisms: "synthetic construct",
      percent_identity: 99.3006993006993,
      query_cover: 100,
      score: 1514,
      sequences:
        "MSIQYFRVALIPFFAAFCLPVFAHPETLVKVKDAEDQLGARVGYIELDLNSGKILESFRPEERFPMMSTFKVLLCGAVLSRVDAGQEQLGRRIHYSQNDLVEYSPVTEKHLTDGMTVRELCSAAITMSDNTAANLLLTTIGGPKELTAFLHNMGDHVTRLDRWEPELNEAIPNDERDTTMPAAMAATLRKLLTGELLTLASRQQLIDWMEADKVAGPLLRSALPAGWFIADKSGAGERGSRGIIAALGPDGKPSRIVVIYTTGSQATMDERNRQIAEIGASLIKHW",
    },
    {
      acc_len: 286,
      accession: "ANG30827",
      description: "beta-lactamase TEM-1 variant",
      e_values: 0,
      hsp_query_from: 1,
      hsp_query_to: 286,
      id: "67926f0b5ae5bc1b8514f993",
      is_selected: true,
      max_score: 587.8,
      organisms: "synthetic construct",
      percent_identity: 99.3006993006993,
      query_cover: 100,
      score: 1514,
      sequences:
        "MSIQYFRVALIPFFAAFCLPVFAHPETLVKVKDAEDQLGARVGYIELDLNSGKILESFRPEERFPMMSTFKVLLCGAVLSRVDAGQEQLGRRIHYSQNDLVEYSPVTEKHLTDGMTVRELCSAAITMSDNTAANLLLTTIGGPKELTAFLHNMGDHVTRLDRWEPELNEAIPNDERDTTMPAAMATTLRKLLAGELLTLASRQQLIDWMEADKVAGPLLRSALPAGWFIADKSGAGERGSRGIIAALGPDGKPSRIVVIYTTGSQATMDERNRQIAEIGASLIKHW",
    },
    {
      acc_len: 286,
      accession: "WP_000027057",
      description: "MULTISPECIES: broad-spectrum class A beta-lactamase TEM-1",
      e_values: 0,
      hsp_query_from: 1,
      hsp_query_to: 286,
      id: "67926f0b5ae5bc1b8514f994",
      is_selected: true,
      max_score: 587.8,
      organisms: "Bacteria",
      percent_identity: 99.65034965034964,
      query_cover: 100,
      score: 1514,
      sequences:
        "MSIQHFRVALIPFFAAFCLPVFAHPETLVKVKDAEDQLGARVGYIELDLNSGKILESFRPEERFPMMSTFKVLLCGAVLSRVDAGQEQLGRRIHYSQNDLVEYSPVTEKHLTDGMTVRELCSAAITMSDNTAANLLLTTIGGPKELTAFLHNMGDHVTRLDRWEPELNEAIPNDERDTTMPAAMATTLRKLLTGELLTLASRQQLIDWMEADKVAGPLLRSALPAGWFIADKSGAGERGSRGIIAALGPDGKPSRIVVIYTTGSQATMDERNRQIAEIGASLIKHW",
    },
    {
      acc_len: 286,
      accession: "ARF46713",
      description: "beta-lactamase TEM-1 variant",
      e_values: 0,
      hsp_query_from: 1,
      hsp_query_to: 286,
      id: "67926f0b5ae5bc1b8514f995",
      is_selected: true,
      max_score: 587.8,
      organisms: "synthetic construct",
      percent_identity: 99.3006993006993,
      query_cover: 100,
      score: 1514,
      sequences:
        "MSIQYFRVALIPFFAAFCLPVFAHPETLVKVKDAEDQLGARVGYIELDLNSGKILESFRPEERFPMMSTFKVLLCGAVLSRVDAGQEQLGRRIHYSQNDLVEYSPVTEKHLTDGMTVRELCSAAITMSDNTAANLLLTTIGGPKELTAFLHNMGDHVTRLDRWEPELNEAIPNDERDTTMPAAMATTLRKLLTGELLTLASRQQLIDWMEADKAAGPLLRSALPAGWFIADKSGAGERGSRGIIAALGPDGKPSRIVVIYTTGSQATMDERNRQIAEIGASLIKHW",
    },
    {
      acc_len: 286,
      accession: "ANG10916",
      description: "beta-lactamase TEM-1 variant",
      e_values: 0,
      hsp_query_from: 1,
      hsp_query_to: 286,
      id: "67926f0b5ae5bc1b8514f996",
      is_selected: true,
      max_score: 587.8,
      organisms: "synthetic construct",
      percent_identity: 99.3006993006993,
      query_cover: 100,
      score: 1514,
      sequences:
        "MSTQYFRVALIPFFAAFCLPVFAHPETLVKVKDAEDQLGARVGYIELDLNSGKILESFRPEERFPMMSTFKVLLCGAVLSRVDAGQEQLGRRIHYSQNDLVEYSPVTEKHLTDGMTVRELCSAAITMSDNTAANLLLTTIGGPKELTAFLHNMGDHVTRLDRWEPELNEAIPNDERDTTMPAAMATTLRKLLTGELLTLASRQQLIDWMEADKVAGPLLRSALPAGWFIADKSGAGERGSRGIIAALGPDGKPSRIVVIYTTGSQATMDERNRQIAEIGASLIKHW",
    },
    {
      acc_len: 294,
      accession: "HDN1137928",
      description: "TEM family class A beta-lactamase",
      e_values: 0,
      hsp_query_from: 1,
      hsp_query_to: 286,
      id: "67926f0b5ae5bc1b8514f997",
      is_selected: true,
      max_score: 587.8,
      organisms: "Escherichia coli",
      percent_identity: 99.65034965034964,
      query_cover: 100,
      score: 1514,
      sequences:
        "MSIQHFRVALIPFFAAFCLPVFAHPETLVKVKDAEDQLGARVGYIELDLNSGKILESFRPEERFPMMSTFKVLLCGAVLSRVDAGQEQLGRRIHYSQNDLVEYSPVTEKHLTDGMTVRELCSAAITMSDNTAANLLLTTIGGPKELTAFLHNMGDHVTRLDRWEPELNEAIPNDERDTTMPAAMATTLRKLLTGELLTLASRQQLIDWMEADKVAGPLLRSALPAGWFIADKSGAGERGSRGIIAALGPDGKPSRIVVIYTTGSQATMDERNRQIAEIGASLIKHW",
    },
    {
      acc_len: 286,
      accession: "WP_215748091",
      description: "TEM family class A beta-lactamase",
      e_values: 0,
      hsp_query_from: 1,
      hsp_query_to: 286,
      id: "67926f0b5ae5bc1b8514f998",
      is_selected: true,
      max_score: 587.8,
      organisms: "Gluconobacter cerevisiae",
      percent_identity: 99.3006993006993,
      query_cover: 100,
      score: 1514,
      sequences:
        "MSIQHFRVALIPFFAAFCLPVFAHPETLVKVKDAEDQLGARVGYIELDLNSGKILESFRPEERFPMMSTFKVLLCGAVLSRVDAGQEQLGRRIHYSQNDLVEYSPVTEKHLTDGMTVRELCSAAITMSDNTAANLLLTTIGGPKELTAFLHNMGDHVTRLDRWEPELNEAIPNDZRDTTMPAAMATTLRKLLTGELLTLASRQQLIDWMEADKVAGPLLRSALPAGWFIADKSGAGERGSRGIIAALGPDGKPSRIVVIYTTGSQATMDERNRQIAEIGASLIKHW",
    },
    {
      acc_len: 286,
      accession: "ANG14661",
      description: "beta-lactamase TEM-1 variant",
      e_values: 0,
      hsp_query_from: 1,
      hsp_query_to: 286,
      id: "67926f0b5ae5bc1b8514f999",
      is_selected: true,
      max_score: 587.415,
      organisms: "synthetic construct",
      percent_identity: 99.3006993006993,
      query_cover: 100,
      score: 1513,
      sequences:
        "MSIQHFRVALIPFFAAFCLPVFAHPETLVKVKDAEDQLGARVGYIELDLNSGKILESFRPEERFPMMSTFKVLLCGAVLSRVDAGQEQLGRRIHYSQNDLVEYSPITEKHLTDGMTVRELCSAAITMSDNTAANLLLTTIGGPKELTAFLHNMGDHVTRLDRWEPELNEAIPNDERDTTMPAAMATTLRKLLTGELLTLASRQQLIDWMEADKVAGPLLRSALPAGWFIADKSGAGERGSRGIIAALGPDGKPSRIVVIYTTGSQATMDERNRQIAEIGASLIKHW",
    },
    {
      acc_len: 286,
      accession: "ANG10160",
      description: "beta-lactamase TEM-1 variant",
      e_values: 0,
      hsp_query_from: 1,
      hsp_query_to: 286,
      id: "67926f0b5ae5bc1b8514f99a",
      is_selected: true,
      max_score: 587.415,
      organisms: "synthetic construct",
      percent_identity: 99.3006993006993,
      query_cover: 100,
      score: 1513,
      sequences:
        "MSIQHFRVALIPFFAAFCLPVFAHPETLVKVKDAEDQLGARVGYIELDLNSGKVLESFRPEERFPMMSTFKVLLCGAVLSRVDAGQEQLGRRIHYSQNDLVEYSPVTEKHLTDGMTVRELCSAAITMSDNTAANLLLTTIGGPKELTAFLHNMGDHVTRLDRWEPELNEAIPNDERDTTMPAAMATTLRKLLTGELLTLASRQQLIDWMEADKVAGPLLRSALPAGWFIADKSGAGERGSRGIIAALGPDGKPSRIVVIYTTGSQATMDERNRQIAEIGASLIKHW",
    },
    {
      acc_len: 286,
      accession: "ANG11443",
      description: "beta-lactamase TEM-1 variant",
      e_values: 0,
      hsp_query_from: 1,
      hsp_query_to: 286,
      id: "67926f0b5ae5bc1b8514f99b",
      is_selected: true,
      max_score: 587.415,
      organisms: "synthetic construct",
      percent_identity: 99.3006993006993,
      query_cover: 100,
      score: 1513,
      sequences:
        "MSIQHFRVALIPFFAAFCLPVFAHPETLVKVKDAEDQLGARVGYIELDLNSGKILESFRPEERFPMMSTFKVLLCGAVLSRVDAGQEQLGRRIHYSQNDLVEYSPVTEKHLTDGMTVRELCSAAITMSDNTAANLLLTTIGGPKELTAFLHNMGDHVTRLDRWEPELNEAIPNDERDTTMPAAMATTLRKLLTGELLTLASRQQLIDWMEADKVAGPLLRSALPAGWFIADKSGAGERGSRGIIAALGPDGKPSRIVVIYTTGSQATMDERNRQVAEIGASLIKHW",
    },
    {
      acc_len: 286,
      accession: "ANG18696",
      description: "beta-lactamase TEM-1 variant",
      e_values: 0,
      hsp_query_from: 1,
      hsp_query_to: 286,
      id: "67926f0b5ae5bc1b8514f99c",
      is_selected: true,
      max_score: 587.415,
      organisms: "synthetic construct",
      percent_identity: 99.3006993006993,
      query_cover: 100,
      score: 1513,
      sequences:
        "MSIQHFRVALIPFFAAFCLPVFAHPETLVKVKDAEDQLGARVGYIELDLNSGKILESFRPEERFPMMSTFKVLLCGAVLSRVDAGQEQLGRRIHYSQNDLVEYSPVTEKHLTDGMTVRELCSAAITMSDNTAANLLLTTIGGPKELTAFLHNMGDHITRLDRWEPELNEAIPNDERDTTMPAAMATTLRKLLTGELLTLASRQQLIDWMEADKVAGPLLRSALPAGWFIADKSGAGERGSRGIIAALGPDGKPSRIVVIYTTGSQATMDERNRQIAEIGASLIKHW",
    },
    {
      acc_len: 286,
      accession: "ANG10864",
      description: "beta-lactamase TEM-1 variant",
      e_values: 0,
      hsp_query_from: 1,
      hsp_query_to: 286,
      id: "67926f0b5ae5bc1b8514f99d",
      is_selected: true,
      max_score: 587.415,
      organisms: "synthetic construct",
      percent_identity: 99.3006993006993,
      query_cover: 100,
      score: 1513,
      sequences:
        "MSIQHFRVALIPFFAAFCLPVFAHPETLVKVKDAEDQLGARVGYIELDLNSGKILESFRPEERFPMMSTFKVLLCGAVLSRVDAGQEQLGRRIHYSQNDLVEYSPVTEKHLTDGMTVRELCSAAITMSDNTAANLLLTTIGGPKELTAFLHNMGDHVTRLDRWEPELNEAIPNDERDTTMPAAMATTLRKLLTGELLTLASRQQLIDWMEADKVAGPLLRSALPAGWFIADKSGAGERGSRGIIAALGPDGKPSRIVIIYTTGSQATMDERNRQIAEIGASLIKHW",
    },
    {
      acc_len: 286,
      accession: "ANG11672",
      description: "beta-lactamase TEM-1 variant",
      e_values: 0,
      hsp_query_from: 1,
      hsp_query_to: 286,
      id: "67926f0b5ae5bc1b8514f99e",
      is_selected: true,
      max_score: 587.415,
      organisms: "synthetic construct",
      percent_identity: 99.3006993006993,
      query_cover: 100,
      score: 1513,
      sequences:
        "MSIQHFRVALIPFFAAFCLPVFAHPETLVKVKDAEDQLGARVGYIELDLNSGKILESFRPEERFPMMSTFKVLLCGAVLSRVDAGQEQLGRRIHYSQNDLVEYSPVTEKHLTDGMTVRELCSAAITMSDNTAANLLLTTIGGPKELTAFLHNMGDHVTRLDRWEPELNEAIPNDERDTTMPAAMATTLRKLLTGELLTLASRQQLIDWMEADKVAGPLLRSALPAGWFIADKSGAGERGSRGIIAALGPDGKPSRIIVIYTTGSQATMDERNRQIAEIGASLIKHW",
    },
    {
      acc_len: 286,
      accession: "WP_161654968",
      description: "TEM family class A beta-lactamase",
      e_values: 0,
      hsp_query_from: 1,
      hsp_query_to: 286,
      id: "67926f0b5ae5bc1b8514f99f",
      is_selected: true,
      max_score: 587.415,
      organisms: "Escherichia coli",
      percent_identity: 99.3006993006993,
      query_cover: 100,
      score: 1513,
      sequences:
        "MSIQHFRVALIPFFAAFCLPVFAHPETLVKVKDAEDQLGARVGYIELDLNSGKILESFRPEERFPMMSTFKVLLCGAILSRVDAGQEQLGRRIHYSQNDLVEYSPVTEKHLTDGMTVRELCSAAITMSDNTAANLLLTTIGGPKELTAFLHNMGDHVTRLDRWEPELNEAIPNDERDTTMPAAMATTLRKLLTGELLTLASRQQLIDWMEADKVAGPLLRSALPAGWFIADKSGAGERGSRGIIAALGPDGKPSRIVVIYTTGSQATMDERNRQIAEIGASLIKHW",
    },
    {
      acc_len: 298,
      accession: "WP_261627585",
      description: "TEM family class A beta-lactamase",
      e_values: 0,
      hsp_query_from: 1,
      hsp_query_to: 286,
      id: "67926f0b5ae5bc1b8514f9a0",
      is_selected: true,
      max_score: 587.415,
      organisms: "Escherichia coli",
      percent_identity: 99.65034965034964,
      query_cover: 100,
      score: 1513,
      sequences:
        "MSIQHFRVALIPFFAAFCLPVFAHPETLVKVKDAEDQLGARVGYIELDLNSGKILESFRPEERFPMMSTFKVLLCGAVLSRVDAGQEQLGRRIHYSQNDLVEYSPVTEKHLTDGMTVRELCSAAITMSDNTAANLLLTTIGGPKELTAFLHNMGDHVTRLDRWEPELNEAIPNDERDTTMPAAMATTLRKLLTGELLTLASRQQLIDWMEADKVAGPLLRSALPAGWFIADKSGAGERGSRGIIAALGPDGKPSRIVVIYTTGSQATMDERNRQIAEIGASLIKHW",
    },
    {
      acc_len: 286,
      accession: "ANG09566",
      description: "beta-lactamase TEM-1 variant",
      e_values: 0,
      hsp_query_from: 1,
      hsp_query_to: 286,
      id: "67926f0b5ae5bc1b8514f9a1",
      is_selected: true,
      max_score: 587.415,
      organisms: "synthetic construct",
      percent_identity: 99.3006993006993,
      query_cover: 100,
      score: 1513,
      sequences:
        "MSIQHFRVALVPFFAAFCLPVFAHPETLVKVKDAEDQLGARVGYIELDLNSGKILESFRPEERFPMMSTFKVLLCGAVLSRVDAGQEQLGRRIHYSQNDLVEYSPVTEKHLTDGMTVRELCSAAITMSDNTAANLLLTTIGGPKELTAFLHNMGDHVTRLDRWEPELNEAIPNDERDTTMPAAMATTLRKLLTGELLTLASRQQLIDWMEADKVAGPLLRSALPAGWFIADKSGAGERGSRGIIAALGPDGKPSRIVVIYTTGSQATMDERNRQIAEIGASLIKHW",
    },
    {
      acc_len: 286,
      accession: "WP_240078874",
      description: "TEM family class A beta-lactamase",
      e_values: 0,
      hsp_query_from: 1,
      hsp_query_to: 286,
      id: "67926f0b5ae5bc1b8514f9a2",
      is_selected: true,
      max_score: 587.415,
      organisms: "Escherichia coli",
      percent_identity: 99.3006993006993,
      query_cover: 100,
      score: 1513,
      sequences:
        "MSIQHFRVALIPFFAAFCLPVFAHPETLVKVKDAEDQLGARVGYVELDLNSGKILESFRPEERFPMMSTFKVLLCGAVLSRVDAGQEQLGRRIHYSQNDLVEYSPVTEKHLTDGMTVRELCSAAITMSDNTAANLLLTTIGGPKELTAFLHNMGDHVTRLDRWEPELNEAIPNDERDTTMPAAMATTLRKLLTGELLTLASRQQLIDWMEADKVAGPLLRSALPAGWFIADKSGAGERGSRGIIAALGPDGKPSRIVVIYTTGSQATMDERNRQIAEIGASLIKHW",
    },
    {
      acc_len: 286,
      accession: "ANG27598",
      description: "beta-lactamase TEM-1 variant",
      e_values: 0,
      hsp_query_from: 1,
      hsp_query_to: 286,
      id: "67926f0b5ae5bc1b8514f9a3",
      is_selected: true,
      max_score: 587.415,
      organisms: "synthetic construct",
      percent_identity: 99.3006993006993,
      query_cover: 100,
      score: 1513,
      sequences:
        "MSIQHFRVALIPFFAAFCLPVFAHPETLVKVKDAEDQLGARVGYIELDLNSGKILESFRPEERFPMMSTFKVLLCGAVLSRVDAGQEQLGRRIHYSQNDLVEYSPVTEKHLTDGMTVRELCSAAITMSDNTAANLLLTTIGGPKELTAFLHNMGDHVTRLDRWEPELNEAIPNDERDTTMPAAMATTLRKLLTGELLTLASRQQLIDWMEADKIAGPLLRSALPAGWFIADKSGAGERGSRGIIAALGPDGKPSRIVVIYTTGSQATMDERNRQIAEIGASLIKHW",
    },
    {
      acc_len: 286,
      accession: "ANG13700",
      description: "beta-lactamase TEM-1 variant",
      e_values: 0,
      hsp_query_from: 1,
      hsp_query_to: 286,
      id: "67926f0b5ae5bc1b8514f9a4",
      is_selected: true,
      max_score: 587.415,
      organisms: "synthetic construct",
      percent_identity: 99.3006993006993,
      query_cover: 100,
      score: 1513,
      sequences:
        "MSIQHFRVALIPFFAAFCLPVFAHPETLVKVKDAEDQLGARVGYIELDLNSGKILESFRPEERFPMMSTFKILLCGAVLSRVDAGQEQLGRRIHYSQNDLVEYSPVTEKHLTDGMTVRELCSAAITMSDNTAANLLLTTIGGPKELTAFLHNMGDHVTRLDRWEPELNEAIPNDERDTTMPAAMATTLRKLLTGELLTLASRQQLIDWMEADKVAGPLLRSALPAGWFIADKSGAGERGSRGIIAALGPDGKPSRIVVIYTTGSQATMDERNRQIAEIGASLIKHW",
    },
    {
      acc_len: 286,
      accession: "ANG10517",
      description: "beta-lactamase TEM-1 variant",
      e_values: 0,
      hsp_query_from: 1,
      hsp_query_to: 286,
      id: "67926f0b5ae5bc1b8514f9a5",
      is_selected: true,
      max_score: 587.415,
      organisms: "synthetic construct",
      percent_identity: 99.3006993006993,
      query_cover: 100,
      score: 1513,
      sequences:
        "MSIQHFRVALIPFFAAFCLPVFAHPETLVKVKDAEDQLGARVGYIELDLNSGKILESFRPEERFPMMSTFKVLLCGAVLSRVDAGQEQLGRRIHYSQNDLVEYSPVTEKHLTDGMTVRELCSAAVTMSDNTAANLLLTTIGGPKELTAFLHNMGDHVTRLDRWEPELNEAIPNDERDTTMPAAMATTLRKLLTGELLTLASRQQLIDWMEADKVAGPLLRSALPAGWFIADKSGAGERGSRGIIAALGPDGKPSRIVVIYTTGSQATMDERNRQIAEIGASLIKHW",
    },
    {
      acc_len: 286,
      accession: "ANG09900",
      description: "beta-lactamase TEM-1 variant",
      e_values: 0,
      hsp_query_from: 1,
      hsp_query_to: 286,
      id: "67926f0b5ae5bc1b8514f9a6",
      is_selected: true,
      max_score: 587.415,
      organisms: "synthetic construct",
      percent_identity: 99.3006993006993,
      query_cover: 100,
      score: 1513,
      sequences:
        "MSIQHFRVALIPFFAAFCLPVFAHPETLVKVKDAEDQLGARVGYIELDLNSGKILESFRPEERFPMMSTFKVLLCGAVLSRVDAGQEQLGRRIHYSQNDLVEYSPVTEKHLTDGMTVRELCSAAITMSDNTAANLLLTTIGGPKELTAFLHNMGDHVTRLDRWEPELNEAIPNDERDTTMPAAMATTLRKLLTGELLTLASRQQLIDWMEADKVAGPLLRSALPAGWFIADKSGAGERGSRGIIAALGPDGKPSRIVVIYTTGSQATMDERNRQIAEVGASLIKHW",
    },
    {
      acc_len: 286,
      accession: "ANG10619",
      description: "beta-lactamase TEM-1 variant",
      e_values: 0,
      hsp_query_from: 1,
      hsp_query_to: 286,
      id: "67926f0b5ae5bc1b8514f9a7",
      is_selected: true,
      max_score: 587.415,
      organisms: "synthetic construct",
      percent_identity: 99.3006993006993,
      query_cover: 100,
      score: 1513,
      sequences:
        "MSIQHFRVALIPFFAAFCLPVFAHPETLVKVKDAEDQLGARVGYIELDLNSGKILESFRPEERFPMMSTFKVLLCGAVLSRVDAGQEQLGRRIHYSQNDLVEYSPVTEKHLTDGMTVRELCSAAITMSDNTAANLLLTTIGGPKELTAFLHNMGDHVTRLDRWEPELNEAIPNDERDTTMPAAMATTLRKLLTGELLTLASRQQLIDWMEADKVAGPLLRSALPAGWFIADKSGAGERGSRGVIAALGPDGKPSRIVVIYTTGSQATMDERNRQIAEIGASLIKHW",
    },
    {
      acc_len: 286,
      accession: "ANG10571",
      description: "beta-lactamase TEM-1 variant",
      e_values: 0,
      hsp_query_from: 1,
      hsp_query_to: 286,
      id: "67926f0b5ae5bc1b8514f9a8",
      is_selected: true,
      max_score: 587.415,
      organisms: "synthetic construct",
      percent_identity: 99.3006993006993,
      query_cover: 100,
      score: 1513,
      sequences:
        "MSIQHFRVALIPFFAAFCLPVFAHPETLVKVKDAEDQLGARVGYIELDLNSGKILESFRPEERFPMMSTFKVLLCGAVLSRVDAGQEQLGRRVHYSQNDLVEYSPVTEKHLTDGMTVRELCSAAITMSDNTAANLLLTTIGGPKELTAFLHNMGDHVTRLDRWEPELNEAIPNDERDTTMPAAMATTLRKLLTGELLTLASRQQLIDWMEADKVAGPLLRSALPAGWFIADKSGAGERGSRGIIAALGPDGKPSRIVVIYTTGSQATMDERNRQIAEIGASLIKHW",
    },
    {
      acc_len: 286,
      accession: "ANG10941",
      description: "beta-lactamase TEM-1 variant",
      e_values: 0,
      hsp_query_from: 1,
      hsp_query_to: 286,
      id: "67926f0b5ae5bc1b8514f9a9",
      is_selected: true,
      max_score: 587.415,
      organisms: "synthetic construct",
      percent_identity: 99.3006993006993,
      query_cover: 100,
      score: 1513,
      sequences:
        "MSIQHFRVALIPFFAAFCLPVFAHPETLVKVKDAEDQLGARVGYIELDLNSGKILESFRPEERFPMMSTFKVLLCGAVLSRVDAGQEQLGRRIHYSQNDLVEYSPVTEKHLTDGMTVRELCSAAITMSDNTAANLLLTTIGGPKELTAFLHNMGDHVTRLDRWEPELNEAIPNDERDTTMPAAMATTLRKLLTGELLTLASRQQLVDWMEADKVAGPLLRSALPAGWFIADKSGAGERGSRGIIAALGPDGKPSRIVVIYTTGSQATMDERNRQIAEIGASLIKHW",
    },
    {
      acc_len: 286,
      accession: "ANG14225",
      description: "beta-lactamase TEM-1 variant",
      e_values: 0,
      hsp_query_from: 1,
      hsp_query_to: 286,
      id: "67926f0b5ae5bc1b8514f9aa",
      is_selected: true,
      max_score: 587.415,
      organisms: "synthetic construct",
      percent_identity: 99.3006993006993,
      query_cover: 100,
      score: 1513,
      sequences:
        "MSIQHFRVALIPFFAAFCLPVFAHPETLVKVKDAEDQLGARVGYIELDLNSGKILESFRPEERFPMMSTFKVLLCGAVLSRVDAGQEQLGRRIHYSQNDLVEYSPVTEKHLTDGMTVRELCSAAITMSDNTAANLLLTTVGGPKELTAFLHNMGDHVTRLDRWEPELNEAIPNDERDTTMPAAMATTLRKLLTGELLTLASRQQLIDWMEADKVAGPLLRSALPAGWFIADKSGAGERGSRGIIAALGPDGKPSRIVVIYTTGSQATMDERNRQIAEIGASLIKHW",
    },
    {
      acc_len: 286,
      accession: "ANG10332",
      description: "beta-lactamase TEM-1 variant",
      e_values: 0,
      hsp_query_from: 1,
      hsp_query_to: 286,
      id: "67926f0b5ae5bc1b8514f9ab",
      is_selected: true,
      max_score: 587.415,
      organisms: "synthetic construct",
      percent_identity: 99.3006993006993,
      query_cover: 100,
      score: 1513,
      sequences:
        "MSIQHFRVALIPFFAAFCLPVFAHPETLVKVKDAEDQLGARVGYIELDLNSGKILESFRPEERFPMMSTFKVLLCGAVLSRVDAGQEQLGRRIHYSQNDLVEYSPVTEKHLTDGMTVRELCSAAITMSDNTAANLLLTTIGGPKELTAFLHNMGDHVTRLDRWEPELNEAIPNDERDTTMPAAMATTLRKLLTGELLTLASRQQLIDWMEADKVAGPLLRSALPAGWFIADKSGAGERGSRGIVAALGPDGKPSRIVVIYTTGSQATMDERNRQIAEIGASLIKHW",
    },
    {
      acc_len: 286,
      accession: "ANG10321",
      description: "beta-lactamase TEM-1 variant",
      e_values: 0,
      hsp_query_from: 1,
      hsp_query_to: 286,
      id: "67926f0b5ae5bc1b8514f9ac",
      is_selected: true,
      max_score: 587.415,
      organisms: "synthetic construct",
      percent_identity: 99.3006993006993,
      query_cover: 100,
      score: 1513,
      sequences:
        "MSIQHFRIALIPFFAAFCLPVFAHPETLVKVKDAEDQLGARVGYIELDLNSGKILESFRPEERFPMMSTFKVLLCGAVLSRVDAGQEQLGRRIHYSQNDLVEYSPVTEKHLTDGMTVRELCSAAITMSDNTAANLLLTTIGGPKELTAFLHNMGDHVTRLDRWEPELNEAIPNDERDTTMPAAMATTLRKLLTGELLTLASRQQLIDWMEADKVAGPLLRSALPAGWFIADKSGAGERGSRGIIAALGPDGKPSRIVVIYTTGSQATMDERNRQIAEIGASLIKHW",
    },
    {
      acc_len: 286,
      accession: "WP_117043934",
      description: "TEM family class A beta-lactamase",
      e_values: 0,
      hsp_query_from: 1,
      hsp_query_to: 286,
      id: "67926f0b5ae5bc1b8514f9ad",
      is_selected: true,
      max_score: 587.415,
      organisms: "Klebsiella pneumoniae",
      percent_identity: 99.3006993006993,
      query_cover: 100,
      score: 1513,
      sequences:
        "MSIQHFRVALIPFFAAFCLPVFAHPETLVKIKDAEDQLGARVGYIELDLNSGKILESFRPEERFPMMSTFKVLLCGAVLSRVDAGQEQLGRRIHYSQNDLVEYSPVTEKHLTDGMTVRELCSAAITMSDNTAANLLLTTIGGPKELTAFLHNMGDHVTRLDRWEPELNEAIPNDERDTTMPAAMATTLRKLLTGELLTLASRQQLIDWMEADKVAGPLLRSALPAGWFIADKSGAGERGSRGIIAALGPDGKPSRIVVIYTTGSQATMDERNRQIAEIGASLIKHW",
    },
    {
      acc_len: 286,
      accession: "ANG09482",
      description: "beta-lactamase TEM-1 variant",
      e_values: 0,
      hsp_query_from: 1,
      hsp_query_to: 286,
      id: "67926f0b5ae5bc1b8514f9ae",
      is_selected: true,
      max_score: 587.415,
      organisms: "synthetic construct",
      percent_identity: 99.3006993006993,
      query_cover: 100,
      score: 1513,
      sequences:
        "MSIQHFRVALIPFFAAFCLPVFAHPETLVKVKDAEDQLGARVGYIELDLNSGKILESFRPEERFPMMSTFKVLLCGAVLSRVDAGQEQLGRRIHYSQNDLVEYSPVTEKHLTDGMTVRELCSAAITMSDNTAANLLLTTIGGPKELTAFLHNMGDHVTRLDRWEPELNEAIPNDERDTTMPAAMATTLRKLLTGELLTLASRQQLIDWMEADKVAGPLLRSALPAGWFIADKSGAGERGSRGIIAALGPDGKPSRVVVIYTTGSQATMDERNRQIAEIGASLIKHW",
    },
    {
      acc_len: 286,
      accession: "WP_094320566",
      description: "MULTISPECIES: TEM family class A beta-lactamase",
      e_values: 0,
      hsp_query_from: 1,
      hsp_query_to: 286,
      id: "67926f0b5ae5bc1b8514f9af",
      is_selected: true,
      max_score: 587.415,
      organisms: "Enterobacteriaceae",
      percent_identity: 99.3006993006993,
      query_cover: 100,
      score: 1513,
      sequences:
        "MSIQHFRVALIPFFAAFCLPVFAHPETLVKVKDAEDQLGARVGYIELDLNSGKILESFRPEERFPMMSTFKVLLCGAVLSRVDAGQEQLGRRIHYSQNDLVEYSPVTEKHLTDGMTIRELCSAAITMSDNTAANLLLTTIGGPKELTAFLHNMGDHVTRLDRWEPELNEAIPNDERDTTMPAAMATTLRKLLTGELLTLASRQQLIDWMEADKVAGPLLRSALPAGWFIADKSGAGERGSRGIIAALGPDGKPSRIVVIYTTGSQATMDERNRQIAEIGASLIKHW",
    },
    {
      acc_len: 286,
      accession: "ANG09950",
      description: "beta-lactamase TEM-1 variant",
      e_values: 0,
      hsp_query_from: 1,
      hsp_query_to: 286,
      id: "67926f0b5ae5bc1b8514f9b0",
      is_selected: true,
      max_score: 587.415,
      organisms: "synthetic construct",
      percent_identity: 99.3006993006993,
      query_cover: 100,
      score: 1513,
      sequences:
        "MSVQHFRVALIPFFAAFCLPVFAHPETLVKVKDAEDQLGARVGYIELDLNSGKILESFRPEERFPMMSTFKVLLCGAVLSRVDAGQEQLGRRIHYSQNDLVEYSPVTEKHLTDGMTVRELCSAAITMSDNTAANLLLTTIGGPKELTAFLHNMGDHVTRLDRWEPELNEAIPNDERDTTMPAAMATTLRKLLTGELLTLASRQQLIDWMEADKVAGPLLRSALPAGWFIADKSGAGERGSRGIIAALGPDGKPSRIVVIYTTGSQATMDERNRQIAEIGASLIKHW",
    },
    {
      acc_len: 286,
      accession: "ANG11187",
      description: "beta-lactamase TEM-1 variant",
      e_values: 0,
      hsp_query_from: 1,
      hsp_query_to: 286,
      id: "67926f0b5ae5bc1b8514f9b1",
      is_selected: true,
      max_score: 587.415,
      organisms: "synthetic construct",
      percent_identity: 99.3006993006993,
      query_cover: 100,
      score: 1513,
      sequences:
        "MSIQHFRVALIPFFAAFCLPVFAHPETLVKVKDAEDQLGARVGYIELDLNSGKILESFRPEERFPMMSTFKVLLCGAVLSRVDAGQEQLGRRIHYSQNDLVEYSPVTEKHLTDGMTVRELCSAAITMSDNTAANLLLTTIGGPKELTAFLHNMGDHVTRLDRWEPELNEAIPNDERDTTMPAAMATTLRKLLTGELLTLASRQQLIDWMEADKVAGPLLRSALPAGWFIADKSGAGERGSRGIIAALGPDGKPSRIVVIYTTGSQATMDERNRQIAEIGASLVKHW",
    },
    {
      acc_len: 286,
      accession: "ANG16208",
      description: "beta-lactamase TEM-1 variant",
      e_values: 0,
      hsp_query_from: 1,
      hsp_query_to: 286,
      id: "67926f0b5ae5bc1b8514f9b2",
      is_selected: true,
      max_score: 587.415,
      organisms: "synthetic construct",
      percent_identity: 99.3006993006993,
      query_cover: 100,
      score: 1513,
      sequences:
        "MSIQHFRVALIPFFAAFCLPVFAHPETLVKVKDAEDQLGARVGYIELDLNSGKILESFRPEERFPMMSTFKVLLCGAVLSRVDAGQEQLGRRIHYSQNDLVEYSPVTEKHLTDGMTVRELCSAAITMSDNTAANLLLTTIGGPKELTAFLHNMGDHVTRLDRWEPELNEAIPNDERDTTMPAAMATTLRKLLTGELLTLASRQQLIDWMEADKVAGPLLRSALPAGWFIADKSGAGERGSRGIIAALGPDGKPSRIVVVYTTGSQATMDERNRQIAEIGASLIKHW",
    },
    {
      acc_len: 286,
      accession: "ANG14159",
      description: "beta-lactamase TEM-1 variant",
      e_values: 0,
      hsp_query_from: 1,
      hsp_query_to: 286,
      id: "67926f0b5ae5bc1b8514f9b3",
      is_selected: true,
      max_score: 587.415,
      organisms: "synthetic construct",
      percent_identity: 99.3006993006993,
      query_cover: 100,
      score: 1513,
      sequences:
        "MSIQHFRVALIPFFAAFCLPVFAHPETLVKVKDAEDQLGARVGYIELDLNSGKILESFRPEERFPMMSTFKVLLCGAVLSRVDAGQEQLGRRIHYSQNDLIEYSPVTEKHLTDGMTVRELCSAAITMSDNTAANLLLTTIGGPKELTAFLHNMGDHVTRLDRWEPELNEAIPNDERDTTMPAAMATTLRKLLTGELLTLASRQQLIDWMEADKVAGPLLRSALPAGWFIADKSGAGERGSRGIIAALGPDGKPSRIVVIYTTGSQATMDERNRQIAEIGASLIKHW",
    },
    {
      acc_len: 286,
      accession: "ANG13191",
      description: "beta-lactamase TEM-1 variant",
      e_values: 0,
      hsp_query_from: 1,
      hsp_query_to: 286,
      id: "67926f0b5ae5bc1b8514f9b4",
      is_selected: true,
      max_score: 587.415,
      organisms: "synthetic construct",
      percent_identity: 99.3006993006993,
      query_cover: 100,
      score: 1513,
      sequences:
        "MSIQHFRVALIPFFAAFCLPIFAHPETLVKVKDAEDQLGARVGYIELDLNSGKILESFRPEERFPMMSTFKVLLCGAVLSRVDAGQEQLGRRIHYSQNDLVEYSPVTEKHLTDGMTVRELCSAAITMSDNTAANLLLTTIGGPKELTAFLHNMGDHVTRLDRWEPELNEAIPNDERDTTMPAAMATTLRKLLTGELLTLASRQQLIDWMEADKVAGPLLRSALPAGWFIADKSGAGERGSRGIIAALGPDGKPSRIVVIYTTGSQATMDERNRQIAEIGASLIKHW",
    },
    {
      acc_len: 286,
      accession: "ANG23386",
      description: "beta-lactamase TEM-1 variant",
      e_values: 0,
      hsp_query_from: 1,
      hsp_query_to: 286,
      id: "67926f0b5ae5bc1b8514f9b5",
      is_selected: true,
      max_score: 587.415,
      organisms: "synthetic construct",
      percent_identity: 99.3006993006993,
      query_cover: 100,
      score: 1513,
      sequences:
        "MSIQYFRVALIPFFAAFCLPVIAHPETLVKVKDAEDQLGARVGYIELDLNSGKILESFRPEERFPMMSTFKVLLCGAVLSRVDAGQEQLGRRIHYSQNDLVEYSPVTEKHLTDGMTVRELCSAAITMSDNTAANLLLTTIGGPKELTAFLHNMGDHVTRLDRWEPELNEAIPNDERDTTMPAAMATTLRKLLTGELLTLASRQQLIDWMEADKVAGPLLRSALPAGWFIADKSGAGERGSRGIIAALGPDGKPSRIVVIYTTGSQATMDERNRQIAEIGASLIKHW",
    },
    {
      acc_len: 286,
      accession: "ANG11172",
      description: "beta-lactamase TEM-1 variant",
      e_values: 0,
      hsp_query_from: 1,
      hsp_query_to: 286,
      id: "67926f0b5ae5bc1b8514f9b6",
      is_selected: true,
      max_score: 587.415,
      organisms: "synthetic construct",
      percent_identity: 99.3006993006993,
      query_cover: 100,
      score: 1513,
      sequences:
        "MSIQHFRVALIPFFAAFCLPVFAHPETLVKVKDAEDQLGARVGYIELDLNSGKILESFRPEERFPMMSTFKVLLCGAVLSRVDAGQEQLGRRIHYSQNDLVEYSPVTEKHLTDGMTVRELCSAAITMSDNTAANLLLTTIGGPKELTAFLHNMGDHVTRLDRWEPELNEAVPNDERDTTMPAAMATTLRKLLTGELLTLASRQQLIDWMEADKVAGPLLRSALPAGWFIADKSGAGERGSRGIIAALGPDGKPSRIVVIYTTGSQATMDERNRQIAEIGASLIKHW",
    },
    {
      acc_len: 286,
      accession: "ANG21639",
      description: "beta-lactamase TEM-1 variant",
      e_values: 0,
      hsp_query_from: 1,
      hsp_query_to: 286,
      id: "67926f0b5ae5bc1b8514f9b7",
      is_selected: true,
      max_score: 587.415,
      organisms: "synthetic construct",
      percent_identity: 99.65034965034964,
      query_cover: 100,
      score: 1513,
      sequences:
        "MSIQCFRVALIPFFAAFCLPVFAHPETLVKVKDAEDQLGARVGYIELDLNSGKILESFRPEERFPMMSTFKVLLCGAVLSRVDAGQEQLGRRIHYSQNDLVEYSPVTEKHLTDGMTVRELCSAAITMSDNTAANLLLTTIGGPKELTAFLHNMGDHVTRLDRWEPELNEAIPNDERDTTMPAAMATTLRKLLTGELLTLASRQQLIDWMEADKVAGPLLRSALPAGWFIADKSGAGERGSRGIIAALGPDGKPSRIVVIYTTGSQATMDERNRQIAEIGASLIKHW",
    },
    {
      acc_len: 286,
      accession: "WP_015058867",
      description: "MULTISPECIES: class A beta-lactamase TEM-171",
      e_values: 0,
      hsp_query_from: 1,
      hsp_query_to: 286,
      id: "67926f0b5ae5bc1b8514f9b8",
      is_selected: true,
      max_score: 587.415,
      organisms: "Bacteria",
      percent_identity: 99.3006993006993,
      query_cover: 100,
      score: 1513,
      sequences:
        "MSIQHFRVALIPFFAAFCLPVFAHPETLVKVKDAEDQLGARVGYIELDLNSGKILESFRPEERFPMMSTFKVLLCGAVLSRIDAGQEQLGRRIHYSQNDLVEYSPVTEKHLTDGMTVRELCSAAITMSDNTAANLLLTTIGGPKELTAFLHNMGDHVTRLDRWEPELNEAIPNDERDTTMPAAMATTLRKLLTGELLTLASRQQLIDWMEADKVAGPLLRSALPAGWFIADKSGAGERGSRGIIAALGPDGKPSRIVVIYTTGSQATMDERNRQIAEIGASLIKHW",
    },
    {
      acc_len: 286,
      accession: "HCH7488344",
      description: "TEM family class A beta-lactamase",
      e_values: 0,
      hsp_query_from: 1,
      hsp_query_to: 286,
      id: "67926f0b5ae5bc1b8514f9b9",
      is_selected: true,
      max_score: 587.03,
      organisms: "Escherichia coli",
      percent_identity: 99.3006993006993,
      query_cover: 100,
      score: 1512,
      sequences:
        "MSIQHFRVALIPFFAAFCLPVFAHPETLVKVKDAEDQLGARVGYIEMDLNSGKILESFRPEERFPMMSTFKVLLCGAVLSRVDAGQEQLGRRIHYSQNDLVEYSPVTEKHLTDGMTVRELCSAAITMSDNTAANLLLTTIGGPKELTAFLHNMGDHVTRLDRWEPELNEAIPNDERDTTMPAAMATTLRKLLTGELLTLASRQQLIDWMEADKVAGPLLRSALPAGWFIADKSGAGERGSRGIIAALGPDGKPSRIVVIYTTGSQATMDERNRQIAEIGASLIKHW",
    },
  ];

  const Header = () => (
    <View style={styles.header}>
      <View>
        <Image src={logo} style={{ width: 207, height: 47 }} />
      </View>
      <View style={styles.spaceY}>
        <Text>{dayjs(jobMockData.created_at).format('D MMMM YYYY')}</Text>
        <Text>Created By: {username}</Text>
      </View>
    </View>
  );

  const Footer = ({ index, total }: { index: number; total: number }) => (
    <View style={styles.footer}>
      <Text>
        Page {index}/{total}
      </Text>
    </View>
  );

  const Report = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <Header />
        <GeneralInfo
          jobName={jobMockData.name}
          jobDescription={jobMockData.description}
          totalTime={formatTime({
            start_time: jobMockData.run_time.query.end_time,
            end_time: jobMockData.run_time.mutation.end_time,
          })}
        />
        <ProteinQueryReport
          tool={jobMockData.meta[0]}
          option={
            jobMockData.options[
              jobMockData.meta[0] as keyof typeof jobMockData.options
            ]
          }
          inputProtein={jobMockData.input_protein}
          runTime={formatTime(jobMockData.run_time.query)}
        />
        <ProteinRepresentationReport
          tool={jobMockData.meta[1]}
          option={
            jobMockData.options[
              jobMockData.meta[1] as keyof typeof jobMockData.options
            ]
          }
          runTime={formatTime(jobMockData.run_time.evotune)}
        />
        <TopModelReport
          tool={jobMockData.meta[2]}
          option={
            jobMockData.options[
              jobMockData.meta[2] as keyof typeof jobMockData.options
            ]
          }
          runTime={formatTime(jobMockData.run_time.fittop)}
        />
        <MutationReport
          tool={jobMockData.meta[3]}
          option={
            jobMockData.options[
              jobMockData.meta[3] as keyof typeof jobMockData.options
            ]
          }
          runTime={formatTime(jobMockData.run_time.mutation)}
        />
        <Footer index={1} total={2} />
      </Page>
      <Page size="A4" style={styles.page}>
        <Header />
        <UploadLabResultReport labResult={jobMockData.lab_result} />
        <QueryResultReport queryResult={queryResultData} />
        <Footer index={2} total={2} />
      </Page>
    </Document>
  );

  return (
    <div>
      <div className="w-full h-[750px] overflow-auto">
        <PDFViewer width="100%" height="100%">
          <Report />
        </PDFViewer>
      </div>
    </div>
  );
}
