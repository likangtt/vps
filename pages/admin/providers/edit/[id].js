                </div>
              </div>
              
              <button
                type="button"
                onClick={addPlan}
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                添加套餐
              </button>
            </div>
            
            {/* 现有套餐列表 */}
            {plans.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full text-white">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="py-2 px-4 text-left">套餐名称</th>
                      <th className="py-2 px-4 text-center">CPU (核)</th>
                      <th className="py-2 px-4 text-center">内存 (GB)</th>
                      <th className="py-2 px-4 text-center">存储 (GB)</th>
                      <th className="py-2 px-4 text-center">带宽 (GB)</th>
                      <th className="py-2 px-4 text-center">价格 ($/月)</th>
                      <th className="py-2 px-4 text-center">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {plans.map((plan, index) => (
                      <tr key={index} className="border-b border-gray-700/30">
                        <td className="py-3 px-4">
                          <input
                            type="text"
                            value={plan.name}
                            onChange={(e) => updatePlan(index, 'name', e.target.value)}
                            className="w-full px-2 py-1 bg-gray-700/50 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-cyan-500/50"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <input
                            type="number"
                            value={plan.cpu}
                            onChange={(e) => updatePlan(index, 'cpu', e.target.value)}
                            min="1"
                            className="w-full px-2 py-1 bg-gray-700/50 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-cyan-500/50 text-center"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <input
                            type="number"
                            value={plan.ram}
                            onChange={(e) => updatePlan(index, 'ram', e.target.value)}
                            min="0.5"
                            step="0.5"
                            className="w-full px-2 py-1 bg-gray-700/50 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-cyan-500/50 text-center"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <input
                            type="number"
                            value={plan.storage}
                            onChange={(e) => updatePlan(index, 'storage', e.target.value)}
                            min="1"
                            className="w-full px-2 py-1 bg-gray-700/50 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-cyan-500/50 text-center"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <input
                            type="number"
                            value={plan.bandwidth}
                            onChange={(e) => updatePlan(index, 'bandwidth', e.target.value)}
                            min="1"
                            className="w-full px-2 py-1 bg-gray-700/50 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-cyan-500/50 text-center"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <input
                            type="number"
                            value={plan.price}
                            onChange={(e) => updatePlan(index, 'price', e.target.value)}
                            min="0.01"
                            step="0.01"
                            className="w-full px-2 py-1 bg-gray-700/50 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-cyan-500/50 text-center"
                          />
                        </td>
                        <td className="py-3 px-4 text-center">
                          <button
                            type="button"
                            onClick={() => removePlan(index)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <svg className="h-5 w-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          
          {/* 提交按钮 */}
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className={`px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-md transition-colors ${isSaving ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSaving ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                  <span>保存中...</span>
                </div>
              ) : '保存更改'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
