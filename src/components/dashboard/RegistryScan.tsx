
import { Progress } from "@/components/ui/progress";

const RegistryScan = () => {
  const vulnerabilities = 1470;
  const totalImages = 2;

  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-medium mb-2">Image Risk Assessment</h4>
        <div className="flex items-center gap-2">
          <div className="text-lg font-bold">{vulnerabilities}</div>
          <div className="text-sm text-gray-500">Total Vulnerabilities</div>
        </div>
        <div className="grid grid-cols-4 gap-1 mt-2">
          <div className="h-2 bg-red-500 rounded-l" />
          <div className="h-2 bg-orange-500" />
          <div className="h-2 bg-yellow-500" />
          <div className="h-2 bg-green-500 rounded-r" />
        </div>
        <div className="grid grid-cols-4 mt-1 text-xs text-gray-500">
          <div>Critical</div>
          <div>High</div>
          <div>Medium</div>
          <div>Low</div>
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-2">Image Security Issues</h4>
        <div className="flex items-center gap-2">
          <div className="text-lg font-bold">{totalImages}</div>
          <div className="text-sm text-gray-500">Total Images</div>
        </div>
        <div className="grid grid-cols-4 gap-1 mt-2">
          <div className="h-2 bg-red-500 rounded-l" />
          <div className="h-2 bg-orange-500" />
          <div className="h-2 bg-yellow-500" />
          <div className="h-2 bg-green-500 rounded-r" />
        </div>
        <div className="grid grid-cols-4 mt-1 text-xs text-gray-500">
          <div>Critical (2)</div>
          <div>High (2)</div>
          <div>Medium (1)</div>
          <div>Low (1)</div>
        </div>
      </div>
    </div>
  );
};

export default RegistryScan;
