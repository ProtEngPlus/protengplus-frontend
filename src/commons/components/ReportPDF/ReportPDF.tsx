import { Page, Text, View, Document, Image } from "@react-pdf/renderer";
import { ReportStyles as styles } from "./ReportStyle";
import logo from "../../../assets/images/Report/protengplus-logo.png";
import GeneralInfo from "./StageReport/GeneralInfo/GeneralInfo";
import ProteinQueryReport from "./StageReport/ProteinQueryReport/ProteinQueryReport";
import ProteinRepresentationReport from "./StageReport/ProteinRepresentationReport/ProteinRepresentationReport";
import TopModelReport from "./StageReport/TopModelReport/TopModelReport";
import MutationReport from "./StageReport/MutationReport/MutationReport";
import { formatTime } from "../../utils/FormatTime";
import UploadLabResultReport, {
  labResult,
} from "./StageReport/UploadLabResultReport/UploadLabResultReport";
import QueryResultReport from "./StageReport/QueryResultReport/QueryResultReport";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { ReportInterface } from "../../interfaces/Report.interface";

export default function ReportPDF({ jobData, chart }: { jobData: ReportInterface, chart?: string }) {
  const [pageIndex, setPageIndex] = useState(1);
  const [paginatedLabResults, setPaginatedLabResults] = useState<labResult[]>(
    []
  );
  const [paginatedQueryResults, setPaginatedQueryResults] = useState<
    Record<string, any>[]
  >([]);

  const username = jobData.username;

  // TODO: Unmock QueryResults
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
  const labResultPerPage = 20;
  const queryResultPerPage = 12;

  useEffect(() => {
    const paginatedLabResults: labResult[] = [];

    for (
      let i = 0;
      i < jobData.lab_result.scores.length;
      i += labResultPerPage
    ) {
      paginatedLabResults.push({
        scores: jobData.lab_result.scores
          .slice(i, i + labResultPerPage)
          .map((score) => Number(score.toFixed(3))),
        sequences: jobData.lab_result.sequences.slice(i, i + labResultPerPage),
      });
    }
    setPaginatedLabResults(paginatedLabResults);

    const paginatedQueryResults: Record<string, any>[] = [];
    for (let i = 0; i < queryResultData.length; i += queryResultPerPage) {
      paginatedQueryResults.push({
        queryResult: queryResultData
          .slice(i, i + queryResultPerPage)
          .map((result) => {
            return {
              ...result,
              acc_len: Number(result.acc_len.toFixed(3)),
              e_values: Number(result.e_values.toFixed(3)),
              hsp_query_from: Number(result.hsp_query_from.toFixed(3)),
              hsp_query_to: Number(result.hsp_query_to.toFixed(3)),
              max_score: Number(result.max_score.toFixed(3)),
              percent_identity: Number(result.percent_identity.toFixed(3)),
              query_cover: Number(result.query_cover.toFixed(3)),
              score: Number(result.score.toFixed(3)),
            };
          }),
      });
    }
    setPaginatedQueryResults(paginatedQueryResults);

    var pageCount = 1;
    if (jobData.lab_result.scores.length > 0) {
      pageCount += paginatedLabResults.length;
    }
    if (queryResultData.length > 0) {
      pageCount += paginatedQueryResults.length;
    }
    if (jobData.run_time?.mutation) {
      pageCount++;
    }

    setPageIndex(pageCount);
  }, []);

  const Header = () => (
    <View style={styles.header}>
      <View>
        <Image src={logo} style={{ width: 207, height: 47 }} />
      </View>
      <View style={styles.spaceY}>
        <Text>{dayjs(jobData.created_at).format("D MMMM YYYY")}</Text>
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

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Header />
        <GeneralInfo
          jobName={jobData.name}
          jobDescription={jobData.description}
          totalTime={
            jobData.run_time
              ? formatTime({
                  start_time: jobData.run_time.query?.end_time,
                  end_time: jobData.run_time.mutation?.end_time,
                })
              : ""
          }
        />
        <ProteinQueryReport
          tool={jobData.meta[0]}
          option={
            jobData.options[jobData.meta[0] as keyof typeof jobData.options]
          }
          inputProtein={jobData.input_protein}
          runTime={jobData.run_time?.query ? formatTime(jobData.run_time.query) : ""}
        />
        <ProteinRepresentationReport
          tool={jobData.meta[1]}
          option={
            jobData.options[jobData.meta[1] as keyof typeof jobData.options]
          }
          runTime={jobData.run_time?.evotune ? formatTime(jobData.run_time.evotune) : ""}
        />
        <TopModelReport
          tool={jobData.meta[2]}
          option={
            jobData.options[jobData.meta[2] as keyof typeof jobData.options]
          }
          runTime={jobData.run_time?.fittop ? formatTime(jobData.run_time.fittop) : ""}
        />
        <MutationReport
          tool={jobData.meta[3]}
          option={
            jobData.options[jobData.meta[3] as keyof typeof jobData.options]
          }
          runTime={
            jobData.run_time?.mutation ? formatTime(jobData.run_time.mutation) : ""
          }
        />
        <Footer index={1} total={pageIndex} />
      </Page>
      {paginatedLabResults.map((chunk, index) => (
        <Page key={index} size="A4" style={styles.page}>
          <Header />
          <UploadLabResultReport
            labResult={chunk}
            countFrom={index * labResultPerPage}
            totalCount={jobData.lab_result.total}
          />
          <Footer index={index + 2} total={pageIndex} />
        </Page>
      ))}
      {paginatedQueryResults.map((chunk, index) => (
        <Page key={index} size="A4" style={styles.page}>
          <Header />
          <QueryResultReport
            queryResult={chunk.queryResult}
            countFrom={index * queryResultPerPage}
            totalCount={queryResultData.length}
          />
          <Footer
            index={paginatedLabResults.length + index + 2}
            total={pageIndex}
          />
        </Page>
      ))}
      {jobData.run_time?.mutation ? (
        <Page size="A4" style={styles.page}>
          <Header />
          <View style={styles.stageInfoBox}>
            <View style={styles.stageTitle}>
              <View style={styles.infoBox}>
                <Text style={styles.stageLabel}>
                  Mutation Result Distribution
                </Text>
              </View>
            </View>
            <View>
              <Image src={chart} style={{ width: 500, height: 176 }} />
            </View>
          </View>
          <Footer
            index={
              1 + paginatedLabResults.length + paginatedQueryResults.length + 1
            }
            total={pageIndex}
          />
        </Page>
      ) : (
        <></>
      )}
    </Document>
  );
}
